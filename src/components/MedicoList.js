import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MedicoDataService from "../services/MedicoDataService";

const MedicoList = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [medicos, setMedicos] = useState();

  const retrieveMedicos = () => {
    MedicoDataService.getAll()
      .then(response => {
        setMedicos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);

    findByTitle(searchTitle);
  };

  const deleteMedico = (id) => {
    if (window.confirm('Deseja excluir?')){
      MedicoDataService.remove(id)
      .then(response => {
        console.log(response.data)
        retrieveMedicos()
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  console.log(medicos);

  const removeAllMedicos = () => {
    if(window.confirm("Deseja remover todos?")){
      MedicoDataService.remove()
      .then(response => {
        console.log(response.data)
        retrieveMedicos()
      })
      .catch(e => {
        console.log(e)
      })
    }  
  };

  const findByTitle = (searchTitle) => {
    MedicoDataService.findByTitle(searchTitle)
    .then(response => {
      setMedicos(response.data)
      console.log(response.data)
    })
    .catch(e => {
      console.log(e)
    })
  };

  useEffect(() => {
    retrieveMedicos();
  }, []);

  return (
    <div className="list row">
      <div className="col-md-10">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          {/* <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div> */}
        </div>
      </div>
      <div className="col-md-10">
      <h4>LISTA DE MÉDICOS</h4>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col" class="x">#</th>
              <th scope="col" class="x">Frist Name</th>
              <th scope="col" class="x">Last Name</th>
              <th scope="col" class="x">Address</th>
              <th scope="col" class="x">Medical Specialty</th>
              <th scope="col" class="x">CPF</th>
              <th scope="col" class="x">CRM</th>
              <th scope="col" class="x">Mobile</th>
              <th scope="col" class="x">Email</th>
              <th scope="col" class="x"></th>
              <th scope="col" class="x"></th>
            </tr>
          </thead>
          <tbody>
          {
            medicos &&
            medicos.map((medico, index) => (
              <tr>
                <th scope="row">{medico.id}</th>
                <td>{medico.firstName}</td>
                <td>{medico.lastName}</td>
                <td>{medico.address}</td>
                <td>{medico.jobArea}</td>
                <td>{medico.CPF}</td>
                <td>{medico.CRM}</td>
                <td>{medico.mobile}</td>
                <td>{medico.email}</td>
                <td> 
                  <Link to={"/Medico/" + medico.id} className="btn btn-warning">
                    Edit
                  </Link>
                </td>
                <td>
                  <Link onClick={() => deleteMedico(medico.id)} className="btn btn-danger">
                    Remove
                  </Link>
                </td>
              </tr>
            ))
          }
            </tbody>
          </table>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllMedicos}>
          Remove All
        </button>
      </div>
    </div>
  );
};
export default MedicoList;
