module.exports = {
  extend: 'apostrophe-pieces-widgets',
  label:'Companys',
  filters: {
    projection: {
      title: 1,
      phone: 1,
      thumbnail: 1,
      // Not a real database property, but including it in the projection
      // fetches everything needed to populate it
      _url: 1,
    }
  },
};