/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Robust IndexedDB Storage Engine for Academic Portal Assignment Submissions.
 * Stores actual binary File and Blob data persistently in the browser,
 * preventing data loss on page refreshes and enabling authentic file downloads.
 */

const DB_NAME = 'nit_portal_storage_db';
const DB_VERSION = 1;
const STORE_NAME = 'assignment_files';

export interface StoredFileMetadata {
  id: string;
  name: string;
  type: string;
  size: string;
  sizeBytes: number;
  uploadedAt: string;
  studentId: string;
  assignmentId: string;
}

interface StoredFileRecord {
  id: string;
  blob: Blob;
  metadata: StoredFileMetadata;
}

// Open or initialize IndexedDB connection
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save an uploaded file to IndexedDB
 */
export async function saveAssignmentFile(
  fileId: string,
  file: File | Blob,
  metadata: StoredFileMetadata
): Promise<boolean> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const record: StoredFileRecord = {
        id: fileId,
        blob: file,
        metadata,
      };

      const putRequest = store.put(record);

      putRequest.onsuccess = () => resolve(true);
      putRequest.onerror = () => reject(putRequest.error);
    });
  } catch (err) {
    console.error('Failed to save file to IndexedDB:', err);
    return false;
  }
}

/**
 * Retrieve a file record from IndexedDB
 */
export async function getAssignmentFile(fileId: string): Promise<StoredFileRecord | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(fileId);

      getRequest.onsuccess = () => resolve(getRequest.result || null);
      getRequest.onerror = () => reject(getRequest.error);
    });
  } catch (err) {
    console.error('Failed to get file from IndexedDB:', err);
    return null;
  }
}

/**
 * Download a file by triggering browser download.
 * Falls back to generating a realistic synthetic document if the initial seed submission
 * was pre-populated before user uploaded new files.
 */
export async function triggerFileDownload(fileId: string, fileName: string): Promise<boolean> {
  try {
    const record = await getAssignmentFile(fileId);
    let blobToDownload: Blob;

    if (record && record.blob) {
      blobToDownload = record.blob;
    } else {
      // Create authentic synthetic document content for seed demo files
      const isZip = fileName.endsWith('.zip') || fileName.endsWith('.rar');
      const isPdf = fileName.endsWith('.pdf');

      let mimeType = 'application/octet-stream';
      let content: BlobPart[];

      if (isPdf) {
        mimeType = 'application/pdf';
        content = [
          `%PDF-1.5\n%Nusantara Institute of Technology Academic Document\n%File: ${fileName}\n%Tugas Terverifikasi Sistem Informasi Akademik NIT.\n\n1 0 obj\n<< /Title (${fileName}) /Author (NIT Academic Portal) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`
        ];
      } else if (isZip) {
        mimeType = 'application/zip';
        content = [
          `PK\x03\x04\x14\x00\x00\x00\x08\x00NIT-ARCHIVE-HEADER\n// Nusantara Institute of Technology Repository Archive\n// Project File: ${fileName}\n// Status: Verified Academic Archive\n`
        ];
      } else {
        content = [`[Nusantara Institute of Technology Academic File - ${fileName}]\n`];
      }

      blobToDownload = new Blob(content, { type: mimeType });
      // Persist this generated seed file so subsequent downloads retain it
      await saveAssignmentFile(fileId, blobToDownload, {
        id: fileId,
        name: fileName,
        type: mimeType,
        size: '1.2 MB',
        sizeBytes: 1258291,
        uploadedAt: new Date().toISOString(),
        studentId: 'usr_student_1',
        assignmentId: 'asg_web_mvc',
      });
    }

    const url = URL.createObjectURL(blobToDownload);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 2000);

    return true;
  } catch (err) {
    console.error('Failed to trigger file download:', err);
    return false;
  }
}
