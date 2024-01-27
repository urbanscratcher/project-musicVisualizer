/**
 * @class
 * @classdesc container class for the visualisations
 */
class VisualizationManager {
  /**
   * Singleton instance
   */
  static instance;

  /**
   * Private constructor to enforce singleton pattern
   * @private
   * @returns {VisualizationManager}
   */
  constructor() {
    if (!VisualizationManager.instance) {
      VisualizationManager.instance = this;
    }
    return VisualizationManager.instance;
  }

  /**
   * Array to store available visualizations
   * @type {Visualization[]}
   */
  visuals = [];

  /**
   * currently selected vis. set to null until vis loaded in
   * @type {Visualization|null}
   */
  selectedVisual = null;

  /**
   * add a new visualisation to the array
   * @param {Visualization} vis
   */
  add(vis) {
    this.visuals.push(vis);
    //if selectedVisual is null set the new visual as the
    //current visualiation
    if (this.selectedVisual == null) {
      this.selectVisual(vis.name);
    }
  }

  /**
   * select a visualisation using it name property
   * @param {string} visName
   */
  selectVisual(visName) {
    for (var i = 0; i < this.visuals.length; i++) {
      if (visName == this.visuals[i].name) {
        this.selectedVisual = this.visuals[i];
      }
    }
  }
}

/**
 * Create a single instance of the Visualizations
 * @type {VisualizationManager}
 */
const visualManager = new VisualizationManager();
export default visualManager;
