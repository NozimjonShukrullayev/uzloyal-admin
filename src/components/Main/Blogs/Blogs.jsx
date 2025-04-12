import { useEffect, useState } from "react";
import "./Blogs.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  addBlogs,
  removeBlogs,
  editBlogs,
  fetchSingleBlog,
} from "./BlogSlice/BlogSlice";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
const Blogs = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title_en, setTitle_en] = useState("");
  const [title_ru, setTitle_ru] = useState("");
  const [title_uz, setTitle_uz] = useState("");
  const [title_tr, setTitle_tr] = useState("");
  const [title_zh, setTitle_zh] = useState("");
  const [text_en, setText_en] = useState("");
  const [text_ru, setText_ru] = useState("");
  const [text_uz, setText_uz] = useState("");
  const [text_tr, setText_tr] = useState("");
  const [text_zh, setText_zh] = useState("");
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState([]);
  const [selectedBlogImages, setSelectedBlogImages] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editTitle_en, setEditTitle_en] = useState("");
  const [editTitle_ru, setEditTitle_ru] = useState("");
  const [editTitle_uz, setEditTitle_uz] = useState("");
  const [editTitle_tr, setEditTitle_tr] = useState("");
  const [editTitle_zh, setEditTitle_zh] = useState("");
  const [editText_en, setEditText_en] = useState("");
  const [editText_ru, setEditText_ru] = useState("");
  const [editText_uz, setEditText_uz] = useState("");
  const [editText_tr, setEditText_tr] = useState("");
  const [editText_zh, setEditText_zh] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  // const [editImages, setEditImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { blogsData, error, loading } = useSelector((state) => state.blogs);

  const img_url = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/";

  const openEditModal = (id) => {
    if (id) {
      setIsEdit(true);
      setEditId(id);
      dispatch(fetchSingleBlog(id));
    } else {
      setIsOpenModal(true);
      setIsEdit(false);
    }
    setIsOpenModal(true);
  };
  useEffect(() => {
    const selectedBlog = blogsData.find((blog) => blog.id === editId);
    if (editId) {
      setEditTitle_en(selectedBlog.title_en);
      setEditTitle_ru(selectedBlog.title_ru);
      setEditTitle_uz(selectedBlog.title_uz);
      setEditTitle_tr(selectedBlog.title_tr);
      setEditTitle_zh(selectedBlog.title_zh);
      setEditText_en(selectedBlog.text_en);
      setEditText_ru(selectedBlog.text_ru);
      setEditText_uz(selectedBlog.text_uz);
      setEditText_tr(selectedBlog.text_tr);
      setEditText_zh(selectedBlog.text_zh);
      setEditAuthor(selectedBlog.author);
      setSelectedBlogImages(selectedBlog.blog_images);
    }
  }, [blogsData, isEdit]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // loading qismi uchun
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

  // blog errorlar uchun
  if (error) {
    return <div>Error: {error}</div>;
  }

  const validateForm = () => {
    return (
      title_en &&
      title_ru &&
      title_uz &&
      title_tr &&
      title_zh &&
      text_en &&
      text_ru &&
      text_uz &&
      text_tr &&
      text_zh &&
      author &&
      images.length
    );
  };

  // blog qo'shish uchun
  const handleAddBlogs = () => {
    if (!validateForm()) {
      toast.warning("Iltimos barcha maydonlarni to'ldiring.");
      return;
    }
    const newBlogs = {
      title_en,
      title_ru,
      title_uz,
      title_tr,
      title_zh,
      text_en,
      text_ru,
      text_uz,
      text_tr,
      text_zh,
      author,
      images,
    };
    dispatch(addBlogs(newBlogs));
    dispatch(fetchBlogs());
    setTitle_en("");
    setTitle_ru("");
    setTitle_uz("");
    setTitle_tr("");
    setTitle_zh("");
    setText_en("");
    setText_ru("");
    setText_uz("");
    setText_tr("");
    setText_zh("");
    setAuthor("");
    setImages(null);
    setIsOpenModal(false);
  };

  // edit qismi uchun
  const handleEditBlogs = () => {
    const updateBlogs = {
      id: editId,
      title_en: editTitle_en,
      title_ru: editTitle_ru,
      title_uz: editTitle_uz,
      title_tr: editTitle_tr,
      title_zh: editTitle_zh,
      text_en: editText_en,
      text_ru: editText_ru,
      text_uz: editText_uz,
      text_tr: editText_tr,
      text_zh: editText_zh,
      author: editAuthor,
    };
    dispatch(editBlogs(updateBlogs));
    setEditTitle_en("");
    setEditTitle_ru("");
    setEditTitle_uz("");
    setEditTitle_tr("");
    setEditTitle_zh("");
    setEditText_en("");
    setEditText_ru("");
    setEditText_uz("");
    setEditText_tr("");
    setEditText_zh("");
    setEditAuthor("");
    // setEditImages(null);
    setIsOpenModal(false);
    setIsEdit(false);
  };

  // images lar modalda ochilishi uchun
  const openImageModal = (images) => {
    setSelectedBlogImages(images);
    setIsImageModalOpen(true);
  };

  // blog delete uchun
  const deleteBlogs = (id) => {
    dispatch(removeBlogs(id));
  };

  return (
    <div className="blogs-container">
      <div className="blog-add-btns">
        <button className="add-btn" onClick={() => setIsOpenModal(true)}>
          Add+
        </button>
      </div>
      <div className="category-table blog-table">
        <table className="categories">
          <thead className="category-thead">
            <tr>
              <th>№</th>
              <th>Title_EN</th>
              <th>Title_RU</th>
              <th>Title_UZ</th>
              <th>Text_EN</th>
              <th>Text_RU</th>
              <th>Text_UZ</th>
              <th>Author</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogsData.map((blog, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{blog.title_en}</td>
                <td>{blog.title_ru}</td>
                <td>{blog.title_uz}</td>
                <td>{blog.text_en}</td>
                <td>{blog.text_ru}</td>
                <td>{blog.text_uz}</td>
                <td>{blog.author}</td>
                <td>
                  <button className="td-images-btn"
                    onClick={() => {
                      openImageModal(blog.blog_images);
                    }}
                  >
                    View Images
                  </button>
                </td>
                <td className="actions-td blog-action-td">
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(blog.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteBlogs(blog.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpenModal && (
        <div className="modal blog-modal">
          <div className="modal-content blog-modal-content">
            <span
              className="close-btn"
              onClick={() => {
                if (isEdit) {
                  setIsEdit(false);
                }
                setIsOpenModal(false);
              }}
            >
              X
            </span>
            <h2>{isEdit ? "Edit Category" : "Add Category"}</h2>
            <div className="blog-modal-inputs">
              <input
                type="text"
                value={isEdit ? editTitle_en : title_en}
                onChange={(e) =>
                  isEdit
                    ? setEditTitle_en(e.target.value)
                    : setTitle_en(e.target.value)
                }
                placeholder="Title_EN"
              />
              <input
                type="text"
                value={isEdit ? editTitle_ru : title_ru}
                onChange={(e) =>
                  isEdit
                    ? setEditTitle_ru(e.target.value)
                    : setTitle_ru(e.target.value)
                }
                placeholder="Title_RU"
              />
              <input
                type="text"
                value={isEdit ? editTitle_uz : title_uz}
                onChange={(e) =>
                  isEdit
                    ? setEditTitle_uz(e.target.value)
                    : setTitle_uz(e.target.value)
                }
                placeholder="Title_UZ"
              />
              <input
                type="text"
                value={isEdit ? editTitle_tr : title_tr}
                onChange={(e) =>
                  isEdit
                    ? setEditTitle_tr(e.target.value)
                    : setTitle_tr(e.target.value)
                }
                placeholder="Title_TR"
              />
              <input
                type="text"
                value={isEdit ? editTitle_zh : title_zh}
                onChange={(e) =>
                  isEdit
                    ? setEditTitle_zh(e.target.value)
                    : setTitle_zh(e.target.value)
                }
                placeholder="Title_ZH"
              />
              <textarea
                type="text"
                value={isEdit ? editText_en : text_en}
                onChange={(e) =>
                  isEdit
                    ? setEditText_en(e.target.value)
                    : setText_en(e.target.value)
                }
                placeholder="Text_EN"
              />
              <textarea
                type="text"
                value={isEdit ? editText_ru : text_ru}
                onChange={(e) =>
                  isEdit
                    ? setEditText_ru(e.target.value)
                    : setText_ru(e.target.value)
                }
                placeholder="Text_RU"
              />
              <textarea
                type="text"
                value={isEdit ? editText_uz : text_uz}
                onChange={(e) =>
                  isEdit
                    ? setEditText_uz(e.target.value)
                    : setText_uz(e.target.value)
                }
                placeholder="Text_UZ"
              />
              <textarea
                type="text"
                value={isEdit ? editText_tr : text_tr}
                onChange={(e) =>
                  isEdit
                    ? setEditText_tr(e.target.value)
                    : setText_tr(e.target.value)
                }
                placeholder="Text_TR"
              />
              <textarea
                type="text"
                value={isEdit ? editText_zh : text_zh}
                onChange={(e) =>
                  isEdit
                    ? setEditText_zh(e.target.value)
                    : setText_zh(e.target.value)
                }
                placeholder="Text_ZH"
              />
              <input
                type="text"
                value={isEdit ? editAuthor : author}
                onChange={(e) =>
                  isEdit
                    ? setEditAuthor(e.target.value)
                    : setAuthor(e.target.value)
                }
                placeholder="Author"
              />
              <input
                type="file"
                placeholder="Images"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />
              {/* <input
                type="file"
                placeholder="Images"
                multiple
                onChange={(e) =>
                  isEdit
                    ? setEditImages(e.target.value)
                    : setImages(e.target.files)
                }
              /> */}
            </div>
            <button onClick={isEdit ? handleEditBlogs : handleAddBlogs}>
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </div>
      )}
      {isImageModalOpen && (
        <div className="image-modal">
          <div className="image-modal-content">
            <span
              className="close-btn"
              onClick={() => setIsImageModalOpen(false)}
            >
              X
            </span>
            <h2>Images</h2>
            <div className="images-container">
              {selectedBlogImages.map((img, index) => (
                <img src={img_url + img.image.src} key={index} alt="" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
