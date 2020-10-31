const list = new Vue({
  el: '#list',
  data() {
    return {
      elements: [],
      canConnect: true,
      dataExists: false,
    }
  },
  methods: {
    setDoneClass: function (state) {
      if (state === true) return 'done';
    },
    done: function (id) {
      updateElement(id);
    },
    remove: function (id) {
      removeElement(id);
    },
    checkElements: function (elements) {
      checkIfDataExists(elements);
      console.log('dsbuds')
    }
  }
})

const form = new Vue({
  el: '#form',
  data: {
    newtask: "",
    canConnect: true
  },
  methods: {
    submitForm() {
      addElement(this.newtask);
      this.newtask = '';
    }
  }
})

let connectionStatus = true;

function getElements() {
  axios.get('http://localhost:3001/v1/elements/').then(function (res) {
    list.elements = res;
    if (res.hasOwnProperty("data") && res.data.length > 0) {
      list.dataExists = true;
    } else {
      list.dataExists = false;
    }
  }).catch(function (error) {
    list.canConnect = false;
    list.dataExists = false;
    form.canConnect = false;
    console.error("Can't connect to db server")
    throw error;
  });
}

function addElement(newtask) {
  axios.post(`http://localhost:3001/v1/elements/`, {
    element: newtask
  })
    .then(res => {
      getElements();
    })
    .catch(err => {
      console.error("addElement Error")
      throw error;
    })
}

function updateElement(index, element) {
  axios.put(`http://localhost:3001/v1/elements/` + index, {
    element: element
  })
    .then(res => {
      getElements();
    })
    .catch(err => {
      console.error("updateElement Error")
      throw error;
    })
}

function removeElement(index) {
  axios.delete(`http://localhost:3001/v1/elements/` + index)
    .then(res => {
      getElements();
    })
    .catch(err => {
      console.error("removeElement Error")
      throw error;
    })
};

getElements();