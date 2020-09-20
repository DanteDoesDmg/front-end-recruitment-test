const baconCloner = document.getElementById('baconCloner');
baconCloner.addEventListener('click', (e) =>
  cloneElement('baconSection', 'bacon', true)
);

/**
 * Function finds a with provided class in a container with provided id,
 * the node is then cloned and returned and based the append parameter
 * inserted into DOM as the last child of the container
 * @function cloneElement
 * @param {string} containerId - id of the container
 * @param {string} elementClass - class of element to clone
 * @param {boolean} append - defaults to false, if true the cloned element
 *        will be appended as the last child of the container
 * @return {Node} - cloned DOM Node
 */
function cloneElement(containerId, elementClass, append = false) {
  try {
    const container = document.getElementById(containerId);
    const node = container.querySelector(`.${elementClass}`);
    const clone = node.cloneNode(true);
    if (append) {
      container.appendChild(clone);
    }
    return clone;
  } catch (err) {
    console.log(err.message)
    const errorMessage = (err.message === 'node is null')
      ? `No element with class '${elementClass}' found inside container`
      : `No container element with id '${containerId}' found`;
    console.error(new Error(errorMessage));
  }
}
