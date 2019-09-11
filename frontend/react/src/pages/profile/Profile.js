import React, { Component } from 'react'
import * as Backend from '../../helper/backend';
import * as Helper from '../../helper/helper-functions';
export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_image: ''
    }
  }

  uploadUserPhoto = ($event) =>{
    Helper.getBase64($event.target.files[0]).then((base64Data)=>{
    const data = { payload: { userImage:  base64Data }}
    Backend.post('/upload', data).then((success)=>{
        this.setState({
          profile_image: success.data.$set.profile_image
        })
      });
    });
  }

  render() {
    return (
      <div className="content">
        <input type="file" name="userImage" accept="image/*" 
        onChange={(event)=> { 
           this.uploadUserPhoto(event) 
      }}
      onClick={(event)=> { 
           event.target.value = null
      }} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title">Edit Profile</h4>
                  <p className="card-category">Complete your profile</p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control" placeholder="Company (disabled)" disabled />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group bmd-form-group">
                          <input placeholder="Usrename" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input type="email" className="form-control" placeholder="Email address" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control"  placeholder="Fist Name"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control" placeholder="Last Name" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control" placeholder="Adress"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control" placeholder="City" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control" placeholder="Country" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input type="text" className="form-control" placeholder="Postal Code" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group bmd-form-group">
                          <label>About Me</label>
                          <div className="form-group bmd-form-group">
                            <textarea className="form-control" rows="5" placeholder="Lamborghini Mercy, Your chick she so thirsty, I'm in that
                            two seat Lambo."></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary pull-right">Update Profile</button>
                    <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-profile">
                <div className="card-avatar">
                  <a href="#pablo">
                    <img className="img" src={this.state.profile_image} />
                  </a>
                </div>
                <div className="card-body">
                  <h6 className="card-category text-gray">CEO / Co-Founder</h6>
                  <h4 className="card-title">Alec Thompson</h4>
                  <p className="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in truth And I love you
                    like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                </p>
                  <a href="#pablo" className="btn btn-primary btn-round">Follow</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
