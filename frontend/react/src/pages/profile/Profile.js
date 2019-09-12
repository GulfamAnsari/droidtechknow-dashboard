import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as Helper from '../../helper/helper-functions';
import * as actions from './store/actions';
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount = async ()=>{
    this.props.fetchUserInfo();
    await this.setState(()=>{
     return this.props.userInfo;
    })
  }

  onInputChange = (event) =>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }


  uploadUserPhoto = ($event) =>{
    Helper.getBase64($event.target.files[0]).then((base64Data)=>{
      this.setState({
        userImage: base64Data
      })
    });
  }

  updateProfile = (event) => {
    event.preventDefault();
    const data = { payload: {...this.state}}
    this.props.updateProfile(data);
  }

  render() {
    return (
      <div className="content">
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
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <input name="firstname" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control"  placeholder="First Name"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <input name="lastname" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Last Name" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input name="mobile" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Mobile Number" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input name="occupation" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Occupation" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <input name="gender" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Gender" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group bmd-form-group">
                          <input name="address" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Adress"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <input name="city" type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="City" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <input name="userDefiendCountry" onChange={(event)=>{this.onInputChange(event)}} type="text" className="form-control" placeholder="Country" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group bmd-form-group">
                          <label>About Me</label>
                          <div className="form-group bmd-form-group">
                            <textarea onChange={(event)=>{this.onInputChange(event)}} name="about" className="form-control" rows="5" placeholder="Lamborghini Mercy, Your chick she so thirsty, I'm in that
                            two seat Lambo."></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label style={{ display:'block', cursor: 'pointer',border: 'dotted 2px #9c27b0',padding: '8px 24px',color: '#9c27b0'}} tabindex="0" for="profile-photo" class="input-file-trigger">Upload your profile photo <i className="fa fa-edit"></i></label>
                          <div className="form-group bmd-form-group">
                            <input type="file" name="userImage" accept="image/*" id="profile-photo" 
                              onChange={(event)=> { 
                                this.uploadUserPhoto(event) 
                            }}
                            onClick={(event)=> { 
                                event.target.value = null
                            }} />
                          </div>
                        </div>
                      </div>
                    </div> 
                    <button type="submit" className="btn btn-primary pull-right" onClick={(event)=>{this.updateProfile(event)}}>Update Profile</button>
                    <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-profile">
                <div className="card-avatar">
                  <img className="img" style={{background: 'white'}} src={this.state.userImage} />
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

const mapStateToProps = (state) => {
  return {
    userInfo: state.Profile_Reducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(actions.updateProfile(data)),
    fetchUserInfo: ()=> dispatch(actions.fetchUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
