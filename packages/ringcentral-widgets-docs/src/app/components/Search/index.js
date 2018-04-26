import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

function SearchResult(props) {
  return (
    <ul className={styles.resultList}>
      {
        props.result.map(item => (
          <li
            key={item.name}
          >
            <Link
              onClick={props.onClick}
              to={`/components/${item.name}`}
            >
              {item.name}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

SearchResult.propTypes = {
  onClick: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: [],
      show: false,
    };
    this.onChange = (e) => {
      const value = e.currentTarget.value;
      this.setState({
        value,
      });
      if (value.length >= 2) {
        this.setState({
          result: this.search(value),
          show: true,
        });
      }
    };

    this.search = text => this.props.components.filter(
      (component) => {
        const searchString = text.toLowerCase();
        if (component.name.toLowerCase().indexOf(searchString) >= 0) {
          return true;
        }
        if (component.description.toLowerCase().indexOf(searchString) >= 0) {
          return true;
        }
        return false;
      }
    );

    this.onSelect = () => {
      this.setState({
        show: false,
      });
    };
  }

  render() {
    const resultClassName =
      classnames(
        styles.result,
        (this.state.result.length > 0 && this.state.show) ? null : styles.hidden
      );
    return (
      <div
        className={styles.root}
      >
        <div className={styles.searchInput}>
          <input
            name="search"
            value={this.state.value}
            onChange={this.onChange}
            className={styles.input}
            placeholder="Search"
            autoComplete="off"
          />
        </div>
        <div
          className={resultClassName}
        >
          <SearchResult
            result={this.state.result}
            onClick={this.onSelect}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
