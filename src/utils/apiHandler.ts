export type TAPiHandlerReturn<T> = {
  getAll: () => Promise<Response>;
  post: (newElement: Omit<T, "id">) => Promise<Response>;
  delete: (id: string) => Promise<Response>;
  update: (
    id: string,
    elementToUpdate: Partial<Omit<T, "id">>
  ) => Promise<Response>;
};

export const apiHandler = <T>(baseUrl: string, endPoint: string) => {
  const urlEndpoint = `${baseUrl}${endPoint}`;
  return {
    /**
     *
     * @returns Promise that resolve in T[]
     */
    getAll: (): Promise<T[]> => {
      return fetch(urlEndpoint).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no Ok");
        }
        return response.json();
      });
    },

    get: (id: string): Promise<T> => {
      return fetch(`${urlEndpoint}/${id}`).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no Ok");
        }
        return response.json();
      });
    },
    /**
     *
     * @param {Omit<T,"id">} newElement
     * @returns Promise that resolve in T
     */
    post: (newElement: Omit<T, "id">): Promise<T> => {
      return fetch(urlEndpoint, {
        method: "POST",
        body: JSON.stringify(newElement),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no Ok");
        }
        return response.json();
      });
    },
    /**
     *
     * @param {string} id
     * @returns Promise
     */
    delete: (id: string): Promise<T> => {
      return fetch(`${urlEndpoint}/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no Ok");
        }
        return response.json();
      });
    },

    /**
     *
     * @param {string} id
     * @param {Partial<Omit<T,"id">>}elementToUpdate
     * @returns Promise that resolve in T
     */
    update: (
      id: string,
      elementToUpdate: Partial<Omit<T, "id">>
    ): Promise<T> => {
      return fetch(`${urlEndpoint}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(elementToUpdate),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no Ok");
        }
        return response.json();
      });
    },
  };
};
