const config = {
  search: {
    default: {
      a: 1
    },
    handle: query => {
      console.log('query: ', query);
    }
  },
  filter: {
    props: {},
    events: {},
    columns: [
      {
        prop: '',
        label: '',
        component: {
          permission: [],
          is: '',
          props: {},
          events: ({ value, record }) => {}
        },
        render: (h, { value, record, rows, index }) => {}
      }
    ],
    operation: {
      add: {
        label: '',
        props: {},
        handle: () => {}
      },
      search: {},
      butns: []
    }
  },
  form: {
    panel: {
      props: {},
      events: {}
    },
    value: {},
    default: {},
    props: {},
    events: {},
    columns: [
      {
        prop: '',
        label: '',
        props: [],
        rules: [],
        tip: '',
        component: {
          permission: [],
          is: '',
          props: {},
          events: ({ value, record }) => {}
        },
        render: (h, { value, record, rows, index }) => {}
      }
    ],
    operation: {
      submit: {
        label: '',
        props: {},
        handle: () => {}
      },
      cancel: {},
      butns: []
    }
  },
  table: {
    query: {},
    search: () => {},
    data: [],
    props: {},
    events: {},
    columns: [],

    operationList: [
      {
        key: 'key',
        props: {},
        butns: []
      }
    ],
    operation: {
      props: {},
      edit: {
        label: '',
        props: {},
        handle: () => {}
      },
      del: {},
      butns: []
    }
  }
};
