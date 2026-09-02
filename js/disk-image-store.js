// js/disk-image-store.js
// Disk Image Store: pick a directory, scan images, persist handles or blobs in IndexedDB.

const DISK_DB_NAME = 'opay_disk_image_store_v1';
const DISK_STORE_DIRS = 'dirHandles';
const DISK_STORE_IMAGES = 'images';

function openDiskDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DISK_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DISK_STORE_DIRS)) db.createObjectStore(DISK_STORE_DIRS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(DISK_STORE_IMAGES)) db.createObjectStore(DISK_STORE_IMAGES, { keyPath: 'name' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function diskIdbPut(storeName, value) {
  const db = await openDiskDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const req = tx.objectStore(storeName).put(value);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = () => reject(req.error);
  });
}

async function diskIdbGetAll(storeName) {
  const db = await openDiskDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function diskIdbGet(storeName, key) {
  const db = await openDiskDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function diskIdbDelete(storeName, key) {
  const db = await openDiskDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const req = tx.objectStore(storeName).delete(key);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

const DiskImageStore = {
  async pickDirectoryAndScan() {
    if (window.showDirectoryPicker) {
      try {
        const dirHandle = await window.showDirectoryPicker();
        // Save a reference keyed by 'primary'
        try {
          await diskIdbPut(DISK_STORE_DIRS, { id: 'primary', handle: dirHandle });
        } catch (e) {
          // Some browsers may not allow storing handles; ignore but continue scanning
          console.warn('Could not persist directory handle:', e);
        }
        await this.scanDirectoryHandleAndStoreImages(dirHandle);
        return true;
      } catch (err) {
        console.warn('Directory pick cancelled or failed', err);
        return false;
      }
    }
    // Fallback
    return this.fallbackSelectFolder();
  },

  async scanDirectoryHandleAndStoreImages(dirHandle, pathPrefix = '') {
    // Walk directory recursively
    for await (const [name, handle] of dirHandle.entries()) {
      const fullPath = pathPrefix ? `${pathPrefix}/${name}` : name;
      if (handle.kind === 'file') {
        try {
          const file = await handle.getFile();
          if (!file.type.startsWith('image/')) continue;
          const blob = file.slice(0, file.size);
          const key = fullPath; // unique within store
          await diskIdbPut(DISK_STORE_IMAGES, { name: key, blob, size: file.size, type: file.type, lastModified: file.lastModified });
        } catch (err) {
          console.error('Error reading file', fullPath, err);
        }
      } else if (handle.kind === 'directory') {
        // recurse
        await this.scanDirectoryHandleAndStoreImages(handle, fullPath);
      }
    }
  },

  async fallbackSelectFolder() {
    return new Promise((resolve) => {
      let input = document.getElementById('opay-folder-input');
      if (!input) {
        input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.multiple = true;
        input.style.display = 'none';
        input.id = 'opay-folder-input';
        document.body.appendChild(input);
      }

      input.onchange = async (e) => {
        const files = Array.from(e.target.files || []);
        for (const f of files) {
          if (!f.type.startsWith('image/')) continue;
          const blob = f.slice(0, f.size);
          const key = f.webkitRelativePath || f.name;
          try {
            await diskIdbPut(DISK_STORE_IMAGES, { name: key, blob, size: f.size, type: f.type, lastModified: f.lastModified });
          } catch (err) {
            console.error('Error storing fallback file', key, err);
          }
        }
        input.value = '';
        resolve(true);
      };

      input.click();
    });
  },

  async loadStoredImages() {
    const rows = await diskIdbGetAll(DISK_STORE_IMAGES);
    return rows.map(r => {
      const url = URL.createObjectURL(r.blob);
      return { name: r.name, url, type: r.type, size: r.size, lastModified: r.lastModified };
    });
  },

  async getRawImageBlob(name) {
    const row = await diskIdbGet(DISK_STORE_IMAGES, name);
    return row ? row.blob : null;
  },

  async clearAll() {
    const rows = await diskIdbGetAll(DISK_STORE_IMAGES);
    for (const r of rows) {
      await diskIdbDelete(DISK_STORE_IMAGES, r.name);
    }
    try {
      await diskIdbDelete(DISK_STORE_DIRS, 'primary');
    } catch (e) {}
  },

  // Rescan using the stored directory handle if available
  async rescanPrimary() {
    try {
      const record = await diskIdbGet(DISK_STORE_DIRS, 'primary');
      if (!record || !record.handle) return false;
      const dirHandle = record.handle;
      // Clear images first to avoid duplicates
      const rows = await diskIdbGetAll(DISK_STORE_IMAGES);
      for (const r of rows) await diskIdbDelete(DISK_STORE_IMAGES, r.name);
      await this.scanDirectoryHandleAndStoreImages(dirHandle);
      return true;
    } catch (e) {
      console.warn('Rescan failed', e);
      return false;
    }
  }
};

window.DiskImageStore = DiskImageStore;
