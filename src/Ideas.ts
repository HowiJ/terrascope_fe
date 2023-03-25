/** @format */

export type TPartialIdea = {
  title: string;
  body: string;
};

/**
 * id: Auto-increment ID
 * created_date: Timestamp
 */
export type TIdea = TPartialIdea & {
  id: number;
  created_date: number;
};

/**
 * Mimics the back-end
 */
class Idea {
  // collections of ideas
  collection: TIdea[] = [
    {
      id: 1,
      created_date: 1679385130000,
      title: 'My First Idea',
      body: 'This is my first idea, I haven\'t had one before this one!',
    },
    {
      id: 2,
      created_date: 1679385130501,
      title: 'My Second Idea',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.',
    },
  ];

  // Auto-Increment ID
  aaid = this.collection.length + 1;

  /**
   * Mimics 'GET /ideas' route
   * Fetches all ideas
   */
  async fetchAll(): Promise<TIdea[]> {
    // fetch('/ideas', { method:'GET' });
    return await [...this.collection];
  }

  /**
   * Mimics 'POST /ideas/new' route
   * Creates a new idea
   */
  async insert(): Promise<TIdea> {
    // fetch('/ideas/new', { method: 'POST' });
    console.log('POST /ideas/new');
    const idea = {
      id: this.aaid,
      created_date: Date.now(),
      title: '',
      body: '',
    };
    this.collection = [...this.collection, idea];
    this.aaid = this.aaid + 1;
    return await idea;
  }

  /**
   * Mimics 'POST /ideas/update' route
   * Updates an existing idea
   */
  async update(idea: TPartialIdea & { id: number }): Promise<TIdea | null> {
    // fetch('/ideas/update', { method: 'POST' });
    console.log('POST /ideas/update');
    const ideaToUpdate = this.collection.find(({ id }) => id === idea.id);
    if (ideaToUpdate == null) {
      console.warn(`idea not found id: ${idea.id}`);
      return null;
    }
    const updatedIdea = {
      ...ideaToUpdate,
      body: idea.body,
      title: idea.title,
    }

    this.collection = this.collection.map(originalIdea => {
      if (idea.id !== originalIdea.id) {
        return originalIdea;
      }
      return updatedIdea;
    })

    return await updatedIdea;
  }

  /**
   * Mimics 'POST /ideas/delete' route
   * Deletes an idea
   */
  async delete(idToDelete: number): Promise<boolean> {
    // fetch('/ideas/delete', { method: 'POST' });
    console.log('POST /ideas/delete');
    this.collection = this.collection.filter(({ id }) => id !== idToDelete);
    return true;
  }
}

const idea = new Idea();

export default idea;
