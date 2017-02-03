class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
     this.student=config.states;
     this.current=this.initial=config.initial;
     this.history=[];
     this.prev_history=[];

    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {return this.current;}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.student) {
        this.history.push(this.current);
        this.current=state;
        this.prev_history=[];
      }
      else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (this.student[this.current].transitions[event])
      {
        this.changeState(this.student[this.current].transitions[event]);
        this.prev_history=[];
      }
      else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {this.current=this.initial;}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (!event) return Object.keys(this.student);
      this.array=[];
      for (var state_path in this.student)
      {
           if (this.student[state_path].transitions[event]) this.array.push(state_path);
      }
           return this.array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (!this.history[0] || this.current===this.initial) return false;
      this.prev_history.push(this.current);
      this.current=this.history.pop();
      return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (!this.prev_history[0]) return false;
        this.history.push(this.current);
        this.current=this.prev_history.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history=[];
      this.prev_history=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
