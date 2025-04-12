import React, { useEffect, useState } from "react";
import "./Sources.css";
import {
  fetchSources,
  removeSources,
  fetchCategory,
  addSources,
} from "./SourcesSlice/SourcesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

const Sources = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("---");
  const [images, setImages] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { sourcesData, error, loading,category } = useSelector((state) => state.sources);

  const img_url = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/";

  useEffect(() => {
    dispatch(fetchSources());
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleOpenModal = (id) => {
    if (id) {
      setEditId(id);
    }
    setIsOpenModal(true);
  };

  const handleRemoveSources = (id) => {
    dispatch(removeSources(id));
  };

  const handleAddSources = () => {
    const newSources = {
      title: title,
      category: selectedCategory,
      images: images,
    };
    dispatch(addSources(newSources))
    // console.log("selected category:", selectedCategory);
    dispatch(fetchSources());
    setTitle("");
    setCategories([]);
    setImages(null);
    setIsOpenModal(false);
  };

  // console.log("sources Data:", sourcesData);

  if (loading) {
    return (
      <div className="loader-container flex justify-center items-center h-[50vh]">
        <Oval
          height={80}
          width={80}
          color="#3498DB"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#07F8AF"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sources-container">
      <div className="sources-add-btns">
        <button
          className="sources-add-btn"
          onClick={() => handleOpenModal(null)}
        >
          Add Source
        </button>
      </div>
      <table className="sources-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Title</th>
            <th>Category</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sourcesData.map((source, index) => (
            <tr key={source?.id}>
              <td>{index + 1}</td>
              <td>
                <a className="sources-file">{source?.title}</a>
              </td>
              <td>{source?.category}</td>
              <td>View images</td>
              <td className="actions-td">
                <button
                  className="sources-edit-btn"
                  onClick={() => handleOpenModal(source?.id)}
                >
                  Edit
                </button>
                <button
                  className="sources-delete-btn"
                  onClick={() => handleRemoveSources(source?.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editId ? "Edit Source" : "Add Source"}</h2>
              <span onClick={() => setIsOpenModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="category">Category</label>
              <select name="categories" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} id="categories">
                <option value="---">---</option>
                {
                  category.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))
                }
              </select>
              <label htmlFor="images">Images</label>
              <input
                type="file"
                id="images"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={handleAddSources}>
                {editId ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sources;
