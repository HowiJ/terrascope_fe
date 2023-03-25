/** @format */

import Storage from './Storage';

/**
 * id: Auto-increment ID
 * created_date: Timestamp
 */
export type Idea = {
  id: number;
  created_date: number;
  title: string;
  body: string;
};

/**
 * Handles the CRUD for the Ideas
 */
class IdeaHandler {
  storage: Storage<Idea> = new Storage<Idea>();
  // collections of ideas
  collection: Idea[] = [];

  // Auto-Increment ID
  aaid = 0;

  constructor() {
    this.storage.fetch().then(data => {
      this.collection = data;
      const lastAAID = this.collection.reduce((accum, idea) => {
        if (idea.id > accum) {
          return idea.id;
        }
        return accum;
      }, 0);
      this.aaid = lastAAID;
    });
  }

  /**
   * Mimics 'GET /ideas' route
   * Fetches all ideas
   */
  async fetchAll(): Promise<Idea[]> {
    // fetch('/ideas', { method:'GET' });
    this.collection = await this.storage.fetch();
    return this.collection;
  }

  /**
   * Mimics 'POST /ideas/new' route
   * Creates a new idea
   */
  async insert(): Promise<Idea> {
    // fetch('/ideas/new', { method: 'POST' });
    console.log('POST /ideas/new');
    this.aaid = this.aaid + 1;
    const idea = {
      id: this.aaid,
      created_date: Date.now(),
      title: '',
      body: '',
    };
    this.collection = await this.storage.store([...this.collection, idea]);
    return await idea;
  }

  /**
   * Mimics 'POST /ideas/update' route
   * Updates an existing idea
   */
  async update(idea: Partial<Idea> & { id: number }): Promise<Idea | null> {
    // fetch('/ideas/update', { method: 'POST' });
    console.log('POST /ideas/update');
    const ideaToUpdate = this.collection.find(({ id }) => id === idea.id);
    if (ideaToUpdate == null) {
      console.warn(`idea not found id: ${idea.id}`);
      return null;
    }
    const updatedIdea = {
      ...ideaToUpdate,
      ...idea,
    };

    const updatedCollection = this.collection.map(originalIdea => {
      if (idea.id !== originalIdea.id) {
        return originalIdea;
      }
      return updatedIdea;
    });
    this.collection = await this.storage.store(updatedCollection);
    return await updatedIdea;
  }

  /**
   * Mimics 'POST /ideas/delete' route
   * Deletes an idea
   */
  async delete(idToDelete: number): Promise<boolean> {
    // fetch('/ideas/delete', { method: 'POST' });
    console.log('POST /ideas/delete');
    this.collection = await this.storage.store(this.collection.filter(({ id }) => id !== idToDelete));

    return true;
  }
}

const idea = new IdeaHandler();

export default idea;
