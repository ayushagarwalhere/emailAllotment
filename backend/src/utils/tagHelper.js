// helper.js
/**
 * Adds a tag to all operations in a Swagger/OpenAPI paths object
 * @param {object} doc - Loaded YAML/JSON Swagger doc
 * @param {string} tagName - Tag to inject into all operations
 * @returns {object} - Updated paths object with tags injected
 */
function addTagToPaths(doc, tagName) {
  const updatedPaths = {};

  for (const [path, methods] of Object.entries(doc.paths)) {
    updatedPaths[path] = {};
    for (const [method, operation] of Object.entries(methods)) {
      updatedPaths[path][method] = {
        ...operation,
        tags: operation.tags || [tagName] // inject tag if missing
      };
    }
  }

  return updatedPaths;
}

export default addTagToPaths;
