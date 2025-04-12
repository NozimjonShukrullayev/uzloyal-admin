import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://api.dezinfeksiyatashkent.uz/api/categories";

const getAuthToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No auth token found in localStorage");
  }
  return token;
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Fetch Categories Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("description", newCategory.description);
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Add Category Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (updateCategory, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("name", updateCategory.name);
      formData.append("description", updateCategory.description);
      const response = await axios.put(
        `${API_URL}/${updateCategory.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Edit Category Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoryData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoryData.push(action.payload);
        toast.success("Added category successfully");
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Failed to add category");
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categoryData.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categoryData[index] = action.payload;
        }
        toast.success("Edited category successfully");
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Failed to edit category");
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categoryData = state.categoryData.filter(
          (category) => category.id !== action.payload
        );
        toast.success("Deleted category successfully");
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Failed to delete category");
      });
  },
});

export default categoriesSlice.reducer;
