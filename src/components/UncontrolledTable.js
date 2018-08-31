import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import includes from 'lodash.includes';
import orderBy from 'lodash.orderby';
import without from 'lodash.without';
import Button from './Button';
import Icon from './Icon';
import Paginator from './Paginator';
import SortableTable from './SortableTable';

export default class UncontrolledTable extends React.Component {
  static propTypes = {
    ...SortableTable.propTypes,
    pageSize: PropTypes.number,
    sort: PropTypes.shape({
      column: PropTypes.string,
      ascending: PropTypes.bool
    })
  }

  static defaultProps = {
    ...SortableTable.defaultProps,
    pageSize: 10,
    sort: {
      ascending: true
    }
  }

  state = {
    sort: this.props.sort,
    expanded: [],
    selected: [],
    page: 0
  }

  sortedData = (rows, column, ascending) => orderBy(
    rows,
    [column],
    [ascending ? 'asc' : 'desc']
  );

  sortBy = (column, ascending) => {
    if (this.state.sort.column === column) {
      this.setState({
        sort: {
          column,
          ascending
        }
      });
    } else {
      this.setState({
        sort: {
          column,
          ascending: true
        }
      });
    }
  };

  get someSelected() {
    return this.state.selected.length > 0;
  }

  get allSelected() {
    return this.props.rows.length && (this.state.selected.length === this.props.rows.length);
  }

  selected(value) {
    return includes(this.state.selected, value);
  }

  toggleSelection = (value) => {
    const selected = this.state.selected;
    const newSelection = includes(selected, value) ?
      without(selected, value) :
      [...selected, value];

    this.setState({ selected: newSelection }, () => this.props.onSelect(newSelection));
  };

  toggleAll = () => {
    const newSelection = this.allSelected ? [] : this.props.rows;

    this.setState({ selected: newSelection },
      this.props.onSelect(newSelection)
    );
  };

  expanded(value) {
    return includes(this.state.expanded, value);
  }

  toggleExpanded = (value) => {
    const expanded = this.state.expanded;
    const newExpanded = includes(expanded, value) ?
      without(expanded, value) :
      [...expanded, value];

    this.setState({ expanded: newExpanded });
  };

  setPage = (page) => {
    this.setState({ page });
  }

  componentWillReceiveProps(nextProps) {
    // Clear selection if rows or selectable change
    if (nextProps.rows !== this.props.rows ||
      nextProps.selectable !== this.props.selectable) {
      this.setState({ selected: [] });
    }
    if (nextProps.rows !== this.props.rows ||
      nextProps.expandable !== this.props.expandable) {
      this.setState({ expanded: [] });
    }
  }

  render() {
    const { page, sort } = this.state;
    const { ascending, column } = sort;
    const { columns, expandable, pageSize, paginated, rowClassName, rowExpanded, rows, selectable, onSelect, ...props } = this.props;
    const cols = columns
      .filter(col => !col.hidden)
      .map(col => (col.sortable !== false) ?
        {
          active: column === col.key,
          ascending,
          onSort: asc => this.sortBy(col.key, asc),
          ...col
        } : col
      );

    if (selectable) {
      cols.unshift({
        align: 'center',
        key: 'select',
        header: (
          <input
            type="checkbox"
            className="mx-1"
            checked={this.allSelected}
            onChange={this.toggleAll}
          />
        ),
        cell: row => (
          <input
            type="checkbox"
            className="mx-1"
            checked={this.selected(row)}
            onChange={() => this.toggleSelection(row)}
          />
        ),
        width: '1%'
      });
    }

    if (expandable) {
      cols.push({
        align: 'center',
        key: 'expand',
        cell: row => (
          <Button
            className="px-2 py-0"
            color="link"
            onClick={() => this.toggleExpanded(row)}
          >
            <Icon name="ellipsis-v" size="lg" />
          </Button>
        ),
        width: '1%'
      });
    }

    const start = page * pageSize;
    const end = start + pageSize;
    const sortedRows = this.sortedData(rows, column, ascending);
    const visibleRows = paginated ? sortedRows.slice(start, end) : sortedRows;

    return (
      <div>
        <SortableTable
          {...props}
          columns={cols}
          rows={visibleRows}
          rowClassName={row => classnames({ 'table-info': this.selected(row) }, rowClassName(row))}
          rowExpanded={row => expandable && this.expanded(row) && rowExpanded(row)}
        />
        {paginated && [
          <hr />,
          <Paginator
            currentPage={page + 1}
            onClick={pg => this.setPage(pg - 1)}
            perPage={pageSize}
            totalItems={rows.length}
          />
        ]}
      </div>
    );
  }
}
