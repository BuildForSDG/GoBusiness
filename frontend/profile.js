<form  onSubmit={handleSubmit}>
        {this.showPreviewImage(values)}
        <div className="card-body">
          <span style={{ color: "#00B0CD", marginLeft: 10 }}>Add Picture</span>
          <div className="form-group">
            <label htmlFor="exampleInputFile">Avatar upload</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={e => {
                    e.preventDefault();
                    setFieldValue("avatars", e.target.files[0]); // for upload
                    setFieldValue(
                      "file_obj",
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name="avatars"
                  className={
                    errors.email && touched.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  accept="image/*"
                  id="avatars"
                  
                />
                <label className="custom-file-label" htmlFor="exampleInputFile">
                  Choose file
                </label>
              </div>
            </div>
          </div>

          <input type="hidden" name="id" value={values._id} />
          <div className="form-group  has-feedback">
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              className={
                errors.email && touched.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              placeholder="Enter email"
            />
            {errors.email && touched.email ? (
              <small id="passwordHelp" class="text-danger">
                {errors.email}
              </small>
            ) : null}
          </div>
          <div className="form-group has-feedback">
            <label htmlFor="username">First Name</label>
            <input
              onChange={handleChange}
              value={values.first_name}
              type="text"
              className={
                errors.first_name && touched.first_name
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="first_name"
              placeholder="Enter First Name"
            />
            {errors.first_name && touched.first_name ? (
              <small id="passwordHelp" class="text-danger">
                {errors.first_name}
              </small>
            ) : null}
          </div>
          <div className="form-group has-feedback">
            <label htmlFor="last_name">Last Name</label>
            <input
              onChange={handleChange}
              value={values.last_name}
              type="text"
              className={
                errors.last_name && touched.last_name
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="last_name"
              placeholder="Enter Last Name"
            />
            {errors.last_name && touched.last_name ? (
              <small id="passwordHelp" class="text-danger">
                {errors.last_name}
              </small>
            ) : null}
          </div>
          <div className="form-group has-feedback">
            <label htmlFor="phone">phone number</label>
            <input
              onChange={handleChange}
              value={values.phone}
              type="text"
              className={
                errors.phone && touched.phone
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="phone"
              placeholder="Enter phone number"
            />
            {errors.phone && touched.phone ? (
              <small id="passwordHelp" class="text-danger">
                {errors.phone}
              </small>
            ) : null}
          </div>
          <div className="form-group has-feedback">
            <label htmlFor="address">address</label>
            <textarea
              onChange={handleChange}
              value={values.address}
              className={
                errors.address && touched.address
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="address"
              placeholder="Address"
            />
            {errors.address && touched.address ? (
              <small id="passwordHelp" class="text-danger">
                {errors.address}
              </small>
            ) : null}
          </div>
        </div>
        {/* /.card-body */}
        <div className="card-footer">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-block btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  render() {
    let result = this.state.response;
    console.log(result);
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="offset-md-3 col-sm-8">
                <h3>Profile</h3>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="offset-md-3 col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">update profile</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <Formik
                    enableReinitialize={true}
                    initialValues={
                      result
                        ? result
                        : {
                            id: "",
                            username: "",
                            email: "",
                            first_name: "",
                            last_name: "",
                            phone: "",
                            address: ""
                          }
                    }
                    onSubmit={(values, { setSubmitting }) => {
                      let formData = new FormData();
                      formData.append("id", values._id);
                      formData.append("first_name", values.first_name);
                      formData.append("last_name", values.last_name);
                      formData.append("phone", values.phone);
                      formData.append("address", values.address);
                      formData.append("email", values.email);
                      if (values.avatars) {
                        formData.append("avatars", values.avatars);
                      }
                      console.log(values.avatars);
                      this.submitForm(formData, this.props.history);
                      setSubmitting(false);
                    }}
                    validationSchema={ProfileSchema}
                  >
                    {props => this.showForm(props)}
                  </Formik>
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
      </div>