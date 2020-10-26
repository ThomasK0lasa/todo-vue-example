const list = new Vue({
  el: '#list',
  data() {
    return {
      elements: null
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
    }
  }
})

const form = new Vue({
  el: '#form',
  data: {
    newtask: ""
  },
  methods: {
    submitForm() {
      addElement(this.newtask);
      this.newtask = '';
    }
  }
})

async function getElements() {
  list.elements = await axios.get('http://localhost:3001/v1/elements/');
}

function addElement(newtask) {
  axios.post(`http://localhost:3001/v1/elements/`, {
      element: newtask
    })
    .then(res => {
      getElements();
    })
}

function updateElement(index, element) {
  axios.put(`http://localhost:3001/v1/elements/` + index, {
      element: element
    })
    .then(res => {
      getElements();
    })
}

function removeElement(index) {
  axios.delete(`http://localhost:3001/v1/elements/`+index)
    .then(res => {
      getElements();
  })
};

getElements();