import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as Helper from '../../helper/helper-functions';
import * as actions from '../../store/actions';
import Table from '../../components/Table/Table';
import * as scss from './Profile.module.scss';
import * as Notiflix from '../../helper/notiflix';
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
      edit: false
    };
  }

  componentDidMount = () => {
    this.setState({
      userInfo: this.props.userInfo,
      error: this.props.error
    })
    if (this.props.userInfo === null) {
      Notiflix.loading('Please Wait. Your Profile will be ready in few moments.');
      this.props.fetchUserInfo().then((data) => {
        this.setState({
          userInfo: this.props.userInfo,
          error: null
        });
        Notiflix.notify('Success', 'Your Profile has been successfully updated.');
        Notiflix.remove();
      }, (error)=>{
        this.setState({
          error: this.props.error
        });
        Notiflix.notify('Failure', this.props.error.message);
      })
    }
  }

  handleChange = () => event => {
    this.setState({ ...this.state, edit: !this.state.edit });
  };

  onInputChange = (event) =>{
    this.setState({
      userInfo: { ...this.state.userInfo, [event.target.name]: event.target.value}
    })
  }


  uploadUserPhoto = ($event) =>{
    Helper.getBase64($event.target.files[0]).then((base64Data)=>{
      this.setState({
        userInfo: { ...this.state.userInfo, userImage: base64Data }
      })
    });
  }

  updateProfile = (event) => {
    event.preventDefault();
    const data = { payload: {...this.state.userInfo}}
    Notiflix.loading('Updating your profile. Please wait.')
    this.props.updateProfile(data);
  }

  getUserTableData = ()=>{
    const { userInfo } =  this.state;
    const showInfo = [{}];
    const allInfo =  [
      {key: 'USERNAME', value: userInfo.username},
      {key: 'EMAIL', value: userInfo.email},      
      {key: 'FIRSTNAME', value: userInfo.firstname},
      {key: 'LASTNAME', value:  userInfo.lastname},
      {key: 'MOBILE', value:userInfo.mobile},
      {key:'OCCUPATION', value: userInfo.occupation},
      {key:'GENDER', value: userInfo.gender},
      {key:'ADDRESS', value: userInfo.address},
      {key:'CITY', value: userInfo.city},
      {key:'COUNTRY', value: userInfo.userDefiendCountry? userInfo.userDefiendCountry: userInfo.country},
      {key:'FACEBOOK URL', value: userInfo.facebookUrl},
      {key:'ABOUT', value: userInfo.about},
    ];
    for (let info of allInfo) {
      if (info['value']) {
        showInfo.push(info)
      }
    }
    return showInfo;
  }

  render() {
    const { edit, userInfo, error } = this.state;
    return (
      <div className={scss.profilePage + ' content'}>
        {
          userInfo ? <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <span className={scss.toggle + ' toggle'} >  
                  <input type="checkbox" id="toggleButton"/>
                  <label onClick={($event)=>{ this.setState({edit: !document.getElementById('toggleButton').checked}) }} for="toggleButton"></label>
                </span>
                {
                  edit ?
                  <div className="card">
                    <div className={`${scss.cardHeader} card-header card-header-primary`}>
                      <div>
                        <h4 className="card-title">Edit Profile</h4>
                      <p className="card-category">Complete your profile</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group bmd-form-group">
                              <input name="firstname" value={userInfo.firstname} type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control"  placeholder="First Name"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group bmd-form-group">
                              <input name="lastname" value={userInfo.lastname} type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Last Name" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group bmd-form-group">
                              <input name="mobile" value={userInfo.mobile} type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Mobile Number" />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group bmd-form-group">
                              <input name="occupation" value={userInfo.occupation} type="text" onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Occupation" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group bmd-form-group">
                              <span style={{color: 'rgba(134, 138, 124, 0.79)', margin: '0 4px 0 0', 'font-weight': '400'}}>Gender </span>
                              <input type="button" name="gender"  onClick={(event)=>{this.onInputChange(event)}} className={`${userInfo.gender === 'male' ? 'btn btn-sm btn-primary': 'btn btn-sm'}`} value="male" />
                              <input type="button" name="gender" onClick={(event)=>{this.onInputChange(event)}} className={`${userInfo.gender === 'female' ? 'btn btn-sm btn-primary': 'btn btn-sm'}`} value="female" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group bmd-form-group">
                              <input name="address" type="text" value={userInfo.address} onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="Adress"/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group bmd-form-group">
                              <input name="city" type="text" value={userInfo.city} onChange={(event)=>{this.onInputChange(event)}} className="form-control" placeholder="City" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group bmd-form-group">
                              <input name="userDefiendCountry" value={userInfo.userDefiendCountry ? userInfo.userDefiendCountry: userInfo.country} onChange={(event)=>{this.onInputChange(event)}} type="text" className="form-control" placeholder="Country" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group bmd-form-group">
                              <input name="facebookUrl" value={userInfo.facebookUrl} onChange={(event)=>{this.onInputChange(event)}} type="text" className="form-control" placeholder="Facebook URL" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group bmd-form-group">
                              <label>About Me</label>
                              <div className="form-group bmd-form-group">
                                <textarea onChange={(event)=>{this.onInputChange(event)}} value={userInfo.about} name="about" className="form-control" rows="5" placeholder="Lamborghini Mercy, Your chick she so thirsty, I'm in that
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
                  :  <Table tableData={{
                        title: 'Profile',
                        icon: 'fa fa-user',
                        data: this.getUserTableData()
                      }} />
                }
              </div>
              <div className="col-md-4">
                <div className="card card-profile">
                  <div className="card-avatar">
                    <img className="img" alt="your-profile" style={{background: 'white'}} src={this.state.userInfo.userImage} />
                  </div>
                  <div className="card-body">
                    {userInfo.occupation ? <h6 className="card-category text-gray">{userInfo.occupation}</h6> : ''}
                    <h4 className="card-title">{userInfo.firstname || userInfo.lastname ? `${userInfo.firstname} ${userInfo.lastname}`: `${userInfo.username}`}</h4> 
                    <p className="card-description">
                      {userInfo.about ? userInfo.about: ''}
                       </p>
                    <a style={userInfo.facebookUrl ? {}: {cursor: 'not-allowed'}} href={userInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-round">Follow</a>
                  </div>
                </div>
              </div>
            </div>
          </div> : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Main_Reducer.userInfo,
    error: state.Main_Reducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(actions.updateProfile(data)),
    fetchUserInfo: () => dispatch(actions.fetchUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
