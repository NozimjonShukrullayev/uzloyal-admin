import { FaSearch } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";
import "./Faqs.css";

export const Faqs = () => {
  const token = localStorage.getItem("access_token");
  const [value, setValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();

  const [NameUz, SetNameUz] = useState();
  const [NameEn, SetNameEn] = useState();
  const [NameRu, SetNameRu] = useState();
  const [NameTr, SetNameTr] = useState();
  const [NameZh, SetNameZh] = useState();

  const [TittleUz, SetTittleUz] = useState();
  const [TittleEn, SetTittleEn] = useState();
  const [TittleRu, SetTittleRu] = useState();
  const [TittleTr, SetTittleTr] = useState();
  const [TittleZh, SetTittleZh] = useState();

  const [PutNameUz, PutSetNameUz] = useState();
  const [PutNameEn, PutSetNameEn] = useState();
  const [PutNameRu, PutSetNameRu] = useState();
  const [PutNameTr, PutSetNameTr] = useState();
  const [PutNameZh, PutSetNameZh] = useState();

  const [PutTittleUz, PutSetTittleUz] = useState();
  const [PutTittleEn, PutSetTittleEn] = useState();
  const [PutTittleRu, PutSetTittleRu] = useState();
  const [PutTittleTr, PutSetTittleTr] = useState();
  const [PutTittleZh, PutSetTittleZh] = useState();

  const {
    data: faqs,
    isLoading,
    isError,
    refetch,
  } = useQuery("faqs", async () => {
    const response = await axios.get(
      "https://api.dezinfeksiyatashkent.uz/api/faqs"
    );
    return response.data;
  });

  const handleNavigate = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setIsEdit(false);
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      refetch();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const mutation = useMutation(
    async (formData) => {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `https://api.dezinfeksiyatashkent.uz/api/faqs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      refetch();
      return response.data.data;
    },
    {
      onSuccess: () => {
        setIsOpenModal(false);
      },
      onError: (error) => {
        console.error("error:", error.message);
      },
    }
  );

  const Putmutation = useMutation(
    async (formData) => {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `https://api.dezinfeksiyatashkent.uz/api/faqs/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      refetch();
      return response.data.data;
    },
    {
      onSuccess: () => {
        setIsEdit(false);
        setIsOpenModal(false);
      },
      onError: (error) => {
        console.error("error:", error.message);
      },
    }
  );

  const filteredFaqs = faqs?.data.filter(
    (item) =>
      item.text_uz.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
      item.text_ru.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
      item.title_uz.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
      item.title_ru.toLowerCase().trim().includes(value.toLowerCase().trim())
  );

  if (isLoading) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text_uz", NameUz);
    formData.append("text_en", NameEn);
    formData.append("text_ru", NameRu);
    formData.append("text_tr", NameTr);
    formData.append("text_zh", NameZh);
    formData.append("title_uz", TittleUz);
    formData.append("title_en", TittleEn);
    formData.append("title_ru", TittleRu);
    formData.append("title_tr", TittleTr);
    formData.append("title_zh", TittleZh);

    mutation.mutate(formData);
  };

  const PuthandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text_uz", PutNameUz);
    formData.append("text_en", PutNameEn);
    formData.append("text_ru", PutNameRu);
    formData.append("text_tr", PutNameTr);
    formData.append("text_zh", PutNameZh);
    formData.append("title_uz", PutTittleUz);
    formData.append("title_en", PutTittleEn);
    formData.append("title_ru", PutTittleRu);
    formData.append("title_tr", PutTittleTr);
    formData.append("title_zh", PutTittleZh);

    Putmutation.mutate(formData);
  };

  return (
    <div className="faqs-container">
      <div className="faqs-search-add">
        <div className="faqs-search">
          <input
            type="text"
            className="faqs-input"
            placeholder="Search faqs"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <FaSearch className="faqs-icon" />
        </div>
        <div className="add-btns">
          <button className="add-btn" onClick={handleNavigate}>
            Add+
          </button>
        </div>
      </div>
      <div className="faqs-table">
        {isError ? (
          <div>Error fetching data</div>
        ) : (
          <table className="faqs">
            <thead className="faqs-thead">
              <tr>
                <th>№</th>
                <th>Name uz</th>
                <th>Name ru</th>
                <th>Title uz</th>
                <th>Title ru</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <h2 className="uppercase text-red-600">No data found</h2>
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.text_uz}</td>
                    <td>{item.text_ru}</td>
                    <td>{item.title_uz}</td>
                    <td>{item.title_ru}</td>
                    <td className="actions-td">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {isOpenModal && (
          <div className="faqs-modal" onClick={handleClose}>
            <form action="#" onSubmit={isEdit ? PuthandleSubmit : handleSubmit}>
              <div
                className="faqs-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close-btn" onClick={handleClose}>
                  X
                </span>
                <h2>{isEdit ? "Edit Category" : "Add Category"}</h2>
                <div className="faqs-inp-flex">
                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      placeholder="Name uz"
                      onChange={(e) =>
                        isEdit
                          ? PutSetNameUz(e.target.value)
                          : SetNameUz(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetNameEn(e.target.value)
                          : SetNameEn(e.target.value)
                      }
                      placeholder="Name ru"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetNameRu(e.target.value)
                          : SetNameRu(e.target.value)
                      }
                      placeholder="Name en"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetNameTr(e.target.value)
                          : SetNameTr(e.target.value)
                      }
                      placeholder="Name Tr"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetNameZh(e.target.value)
                          : SetNameZh(e.target.value)
                      }
                      placeholder="Name Zh"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetTittleUz(e.target.value)
                          : SetTittleUz(e.target.value)
                      }
                      placeholder="Title uz"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetTittleEn(e.target.value)
                          : SetTittleEn(e.target.value)
                      }
                      placeholder="Title en"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetTittleRu(e.target.value)
                          : SetTittleRu(e.target.value)
                      }
                      placeholder="Title ru"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetTittleTr(e.target.value)
                          : SetTittleTr(e.target.value)
                      }
                      placeholder="Title tr"
                      required
                    />
                  </div>

                  <div className="faqs-inp-box">
                    <input
                      className="faqs-inp"
                      type="text"
                      onChange={(e) =>
                        isEdit
                          ? PutSetTittleZh(e.target.value)
                          : SetTittleZh(e.target.value)
                      }
                      placeholder="Title zh"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="faqs-modal-button">
                  {isEdit ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
