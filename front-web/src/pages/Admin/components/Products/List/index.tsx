import React from 'react';
import { useHistory } from 'react-router-dom';

const List = () => {
  const history = useHistory();

  const handleCreate = () => {
    history.push('/admin/products/create');
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btg-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
    </div>
  );
}

export default List;