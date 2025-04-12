import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://api.dezinfeksiyatashkent.uz/api/sources";
const category_api = "https://api.dezinfeksiyatashkent.uz/api/categories";

const getAuthToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No auth token found in localStorage");
  }
  return token;
};

export const fetchSources = createAsyncThunk(
  'sources/fetchSources',
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
      console.error("Fetch Sources Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "sources/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(category_api, {
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

export const addSources = createAsyncThunk(
  "sources/addSources",
  async (newSources, {rejectWithValue}) => {
    try {
      const token = getAuthToken()
      const formData = new FormData()
      formData.append("title", newSources.title)
      formData.append("categories", newSources.category)
      Array.from(newSources.images).forEach((image) => {
        formData.append("images", image)
      })
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.data
    } catch (error) {
      console.error("Add Sources Error:", error.response)
      return rejectWithValue(error.message)
    }
  }
)

export const removeSources = createAsyncThunk(
  "sources/removeSources",
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
      console.error("Remove Sources Error:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

const sourcesSlice = createSlice({
  name: "sources",
  initialState: {
    sourcesData: [],
    category: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.loading = false;
        state.sourcesData = action.payload;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategory.fulfilled, (state,action) => {
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state,action) => {
        state.error = action.payload;
      })
      .addCase(addSources.pending, (state,action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSources.fulfilled, (state,action) => {
        state.sourcesData.push(action.payload);
        toast.success("Added sources successfully");
      })
      .addCase(addSources.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Added sources error");
      })
      .addCase(removeSources.fulfilled, (state, action) => {
        state.sourcesData = state.sourcesData.filter(source => source.id !== action.payload);
        toast.success("Removed sources successfully");
      })
      .addCase(removeSources.rejected, (state, action) => {
        state.error = action.payload;
        toast.error("Removed sources error");
      });
  },
});

export default sourcesSlice.reducer;
