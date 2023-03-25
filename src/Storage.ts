const KEY = 'COLLECTIONS';

/**
 * Handles storing into local storage
 */
class Storage<T> {
  private fetchCollection(): T[] {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  }

  async fetch(): Promise<T[]> {
    const collections = this.fetchCollection();
    return await collections;
  }

  async store(collection: T[]): Promise<T[]> {
    localStorage.setItem(KEY, JSON.stringify(collection));
    return await collection;
  }
}

export default Storage;
