module.exports = {
  name: 'people-page',
  extend: 'apostrophe-pieces',
  label: 'People Page',
  pluralLabel: 'People Pages',
  addFields: [ {
    name: 'title',
    label: 'Full Name',
    type: 'string',
    required: true
  }],
  piecesFilters: [
    {
      name: 'tags',
      counts: true
    }
  ]
};

