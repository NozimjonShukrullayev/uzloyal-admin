import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://api.dezinfeksiyatashkent.uz/api/blogs";

const getAuthToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No auth token found in localStorage");
  }
  return token;
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
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
      console.error("Fetch Blogs Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const addBlogs = createAsyncThunk(
  "blogs/addBlogs",
  async (newBlogs, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("title_en", newBlogs.title_en);
      formData.append("title_ru", newBlogs.title_ru);
      formData.append("title_uz", newBlogs.title_uz);
      formData.append("title_tr", newBlogs.title_tr);
      formData.append("title_zh", newBlogs.title_zh);
      formData.append("text_en", newBlogs.text_en);
      formData.append("text_ru", newBlogs.text_ru);
      formData.append("text_uz", newBlogs.text_uz);
      formData.append("text_tr", newBlogs.text_tr);
      formData.append("text_zh", newBlogs.text_zh);
      formData.append("author", newBlogs.author);
      Array.from(newBlogs.images).forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Add Blogs Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleBlog = createAsyncThunk(
  "blogs/FetchSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Fetch Single Blog Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const editBlogs = createAsyncThunk(
  "blogs/editBlogs",
  async (updateBlogs, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("title_en", updateBlogs.title_en);
      formData.append("title_ru", updateBlogs.title_ru);
      formData.append("title_uz", updateBlogs.title_uz);
      formData.append("title_tr", updateBlogs.title_tr);
      formData.append("title_zh", updateBlogs.title_zh);
      formData.append("text_en", updateBlogs.text_en);
      formData.append("text_ru", updateBlogs.text_ru);
      formData.append("text_uz", updateBlogs.text_uz);
      formData.append("text_tr", updateBlogs.text_tr);
      formData.append("text_zh", updateBlogs.text_zh);
      formData.append("author", updateBlogs.author);
      // if (updateBlogs.images && updateBlogs.images.length > 0) {
      //   Array.from(updateBlogs.images).forEach((image) => {
      //     formData.append("images", image);
      //   });
      // }
      console.log("FormData sent to server:", formData);

      const response = await axios.put(
        `${API_URL}/${updateBlogs.id}`,
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
      console.error("Edit Blogs Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const removeBlogs = createAsyncThunk(
  "blogs/removeBlogs",
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

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogsData: [],
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogsData = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlogs.fulfilled, (state, action) => {
        state.blogsData.push(action.payload);
        state.loading = false;
        toast.success("Added blog successfully");
      })
      .addCase(addBlogs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error("Failed to add blog");
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBlogs.fulfilled, (state, action) => {
        const index = state.blogsData.findIndex(
          (blog) => blog.id === action.payload.id
        );
        if (index !== -1) {
          state.blogsData[index] = action.payload;
        }
        state.loading = false;
        toast.success("Edited blog successfully");
      })
      .addCase(editBlogs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error("Failed to edit blog");
      })
      .addCase(removeBlogs.fulfilled, (state, action) => {
        state.blogsData = state.blogsData.filter(
          (blog) => blog.id !== action.payload
        );
        toast.success("Removed blog successfully");
      })
      .addCase(removeBlogs.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Failed to delete blog");
      });
  },
});

export default blogsSlice.reducer;
