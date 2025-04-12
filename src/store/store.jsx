import { configureStore } from "@reduxjs/toolkit";
import activeMenuReducer from "../components/Layout/menuSlice/menuSlice";
import categoriesReducer from "../components/Main/Categories/CategorySlice/CategorySlice";
import sourcesReducer from "../components/Main/Sources/SourcesSlice/SourcesSlice"
import blogsReducer from "../components/Main/Blogs/BlogSlice/BlogSlice";
import newsReducer from "../components/Main/News/NewsSlice"
import authSlice from "../components/Login/loginSlice";

export const store = configureStore({
  reducer: {
    activeMenu: activeMenuReducer,
    categories: categoriesReducer,
    blogs: blogsReducer,
    sources: sourcesReducer,
    news: newsReducer,
    auth: authSlice,
  },
});
