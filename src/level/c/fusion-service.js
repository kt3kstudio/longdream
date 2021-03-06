const {object} = require('dom-gen')

const {emits, component} = capsid

/**
 * FusionService performs the fusion of the pair of cells.
 */
@component('fusion-service')
class FusionService {
  /**
   * @param {Grid} grid The grid
   */
  setGrid (grid) {
    this.grid = grid
  }

  /**
   * Processes the funsion pair stream and returns the stream of new born cells
   *
   * @param {Rx.Observable<FusionPair>}
   * @return {Rx.Observable<Cell>}
   */
  processFusionPairStream (fusionPairStream) {
    return fusionPairStream.pipe(fusionPair => this.performFusion(fusionPair))
  }

  /**
   * Performs fusion.
   *
   * @param {FusionPair} pair The pair
   * @return {Promise} {Promise<Cell>} The new cell
   */
  performFusion (pair) {
    return this.getToReactor(pair).then(() => this.fusion(pair))
  }

  /**
   * Makes the pair go to the reactor.
   *
   * @private
   * @param {FusionPair} pair The pair going to fusion reactor
   * @return {Promise} The end of the animation of going to the reactor
   */
  getToReactor (pair) {
    const dur = 1000

    // pair.right could be null
    if (pair.right) {
      pair.right.anim('get-to-reactor-right', dur).then(() => pair.right.remove())
    }

    // pair.left always exists
    return pair.left.anim('get-to-reactor-left', dur).then(() => pair.left.remove())
  }

  /**
   * Perform cell fusion.
   * @private
   * @param {FusionPair} pair The fusion pair
   * @return {Promise} The new cell {Promise<Cell>}
   */
  @emits('cell-fusion')
  fusion (pair) {
    const dur = 600

    const cell = object({
      data: {gene: pair.newGene()},
      prependTo: this.elem,
      cc: 'cell'
    }).cc.get('cell')

    cell.setGrid(this.grid, 0, 0)

    if (pair.isLastOne()) {
      cell.setLastOne()
    }

    if (pair.isEvolving()) {
      cell.setEvolved()
    }

    return cell.show(dur).then(() => cell)
  }
}

module.exports = FusionService
