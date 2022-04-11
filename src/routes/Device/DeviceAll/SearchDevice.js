import React from "react";
import { Input } from "antd";

const Search = Input.Search;

const SearchDevice = ({filter, onSearch, handleChangeData, ...props }) => (
  <div {...props}>
    <Search
      placeholder="Cari Data ..."
      style={{ width: 200 }}
      onChange={handleChangeData}
      value={filter}
    />
  </div>
);

export default SearchDevice