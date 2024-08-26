// src/components/Products.js

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Products() {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editMode && currentProductId) {
        await updateProduct(currentProductId, data);
      } else {
        await createProduct(data);
      }
      reset();
      setEditMode(false);
      setCurrentProductId(null);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProductId(product.id);
    setValue('name', product.name);
    setValue('price', product.price);
    setValue('description', product.description);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('price')}
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('description')}
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {editMode ? 'Update' : 'Add'} Product
        </Button>
        <Button
          type="button"
          onClick={() => { reset(); setEditMode(false); setCurrentProductId(null); }}
          variant="outlined"
          color="secondary"
        >
          Reset
        </Button>
      </form>

      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={`${product.name} - $${product.price}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEdit(product)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(product.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Products;
