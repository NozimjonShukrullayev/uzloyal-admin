import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory,
} from "./CategorySlice/CategorySlice";
import "./Categories.css";
import { Oval } from "react-loader-spinner";
const Categories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { categoryData, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // bu qismi editni bosganda tanlangan category malumotlarini chiqarish uchun
  useEffect(() => {
    if (editId !== null) {
      const category = categoryData.find((cat) => cat.id === editId);
      if (category) {
        setEditName(category.name);
        setEditDescription(category.description);
      }
    }
  }, [editId, categoryData]);

  if (loading) {
    return (
      <div className="loader-container flex justify-center items-center h-[50vh]">
        <Oval
          height={80}
          width={80}
          color="#3498DB "
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

  //category qo'shish uchun
  const handleAddCategory = () => {
    const newCategory = { name, description };
    dispatch(addCategory(newCategory));
    setName("");
    setDescription("");
    setIsOpenModal(false);
  };

  // edit category
  const handleEditCategory = () => {
    const updateCategory = {
      id: editId,
      name: editName,
      description: editDescription,
    };
    dispatch(editCategory(updateCategory));
    setEditName("");
    setEditDescription("");
    setIsOpenModal(false);
    setIsEdit(false);
    setEditId(null);
  };

  // open modal
  const openEditModal = (id) => {
    if (id) {
      setEditId(id);
      setIsOpenModal(true);
      setIsEdit(true);
    } else {
      setIsEdit(false);
      setIsOpenModal(true);
    }
  };

  // delete category uchun
  const deleteCategory = (id) => {
    dispatch(removeCategory(id));
  };

  // search category uchun
  const filteredCategory = categoryData.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="categories-container">
      <div className="category-search-add">
        <div className="category-search">
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="add-btns">
          <button className="add-btn" onClick={() => setIsOpenModal(true)}>
            Add+
          </button>
        </div>
      </div>
      <div className="category-table">
        <table className="categories">
          <thead className="category-thead">
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategory.length === 0 ? (
              <>
                <tr>
                  <td colSpan={4}>
                    <h2 className="uppercase text-red-600">No data found</h2>
                  </td>
                </tr>
              </>
            ) : (
              filteredCategory.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td className="actions-td">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(category.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOpenModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-btn"
              onClick={(id) => {
                if (id) {
                  setIsEdit(false);
                  setIsOpenModal(false);
                } else {
                  setIsOpenModal(false);
                }
              }}
            >
              X
            </span>
            <h2>{isEdit ? "Edit Category" : "Add Category"}</h2>
            <input
              type="text"
              placeholder="Name"
              value={isEdit ? editName : name}
              onChange={(e) =>
                isEdit ? setEditName(e.target.value) : setName(e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={isEdit ? editDescription : description}
              onChange={(e) =>
                isEdit
                  ? setEditDescription(e.target.value)
                  : setDescription(e.target.value)
              }
            />
            <button
              onClick={isEdit ? () => handleEditCategory() : handleAddCategory}
            >
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
