import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

class AddRestaurant extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menuImg: '',
            restaurantName: '',
            tagline:'',
            address: '',
            phone:'',
            openingTime:'',
            closingTime: '',
            imageUrl: '',
            imageAlt: '',

            menuImgError: '',
            restaurantNameError: '',
            addressError: '',
            phoneError:'',
            imageUrlError: '',

            restaurantId: '',
            loading: false,
        }
    }

    validateForm = () =>{
        const {restaurantName, address, phone, imageUrl, imageAlt} = this.state;
        var isValid = true;

        if(restaurantName === ''){
            this.setState({
                restaurantNameError: 'Restaurant name is required'
            })
            isValid = false
        }
        else if(!restaurantName.match(/[A-Za-z0-9_.-]+/))
        {
            this.setState({
                restaurantNameError: 'Enter only letters and numbers'
            })
            isValid = false
        }
        else{
            this.setState({
                restaurantNameError: ''
            })
            isValid = true
        }
        if(address===''){
            this.setState({
                addressError: 'Address is required'
            })
            isValid = false
        }
        else if(address!==''){
            this.setState({
                addressError: ''
            })
            isValid = true
        }
        if(phone===''){
            this.setState({
                phoneError: 'Phone number is required'
            })
            isValid = false
        }
        else if(!phone.match(/(7|8|9)\d{9}/)){
            this.setState({
                phoneError: 'Phone must have 10 digits and start with 7 or 8 or 9'
            })
            isValid = false
        }
        else{
            this.setState({
                phoneError: ''
            })
            isValid = true 
        }
        if(imageUrl === '')
        {
            this.setState({
                imageUrlError: 'Image is required'
            })
            isValid = false
        }
        else if(imageAlt.match(/(\.jpg|\.jpeg|\.png)$/i))
        {
            this.setState({
                imageUrlError: 'Only PNG, JPG & JPEG files allowed'
            })
            isValid = false
        }
        else{
            this.setState({
                imageUrlError: ''
            })
            isValid = true 
        }
        return isValid;
    }

    uploadImageToCloud = async (e) => {
        console.log("after image upload", this.state.menuImg);

        this.setState({
            loading: true
        })

        const formData = new FormData();
        formData.append('file', this.state.menuImg);
        formData.append('upload_preset', 'drcnyhn7j');

        let imageData = await axios.post('https://api.Cloudinary.com/v1_1/drcnyhn7j/image/upload', formData)

        console.log('imageData log: ', imageData);

        this.setState({
            imageUrl: imageData.data.secure_url,
            imageAlt: `An image of ${imageData.data.original_filename}`
        })
    }

    componentDidMount(){
        const restaurantObj = this.props.location.restaurantObj;
        if(restaurantObj)
        {
            this.setState({
                restaurantId: restaurantObj.id,
                tagline: restaurantObj.tagline,
                restaurantName: restaurantObj.restaurantName,
                address: restaurantObj.address,
                phone: restaurantObj.phone,
                openingTime: restaurantObj.openingTime,
                closingTime: restaurantObj.closingTime,
                imageUrl: restaurantObj.imgUrl,
                imageAlt:restaurantObj.imgAlt
            })
        }      
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const isValidForm = this.validateForm();

        // if rastaurant id is undefined that means new entry
        if(isValidForm && this.state.restaurantId==='')
        {
            let restaurant = {
                restaurantName: this.state.restaurantName,
                tagline: this.state.tagline,
                address: this.state.address,
                phone: this.state.phone,
                openingTime: this.state.openingTime,
                closingTime: this.state.closingTime,
                imgUrl: this.state.imageUrl,
                imgAlt: this.state.imageAlt
            }
            let restaurantData = await axios.post('http://localhost:1337/restaurant/create', restaurant);
            console.log("restaurant response: ", restaurantData);

            this.setState({
                menuImg: '',
                restaurantName: '',
                tagline: '',
                address: '',
                phone: '',
                openingTime: '',
                closingTime: '',
                imageUrl: '',
                imageAlt: ''
            })
            this.props.history.push('/restaurant/manage');
        }

        //if we get restaurant id from update button click
        else if(this.state.restaurantId !== '') {

            let updatedRestaurant = {
                restaurantName: this.state.restaurantName,
                tagline: this.state.tagline,
                address: this.state.address,
                phone: this.state.phone,
                openingTime: this.state.openingTime,
                closingTime: this.state.closingTime,
                imgUrl: this.state.imageUrl,
                imgAlt: this.state.imageAlt
            }
            
            axios.put(`http://localhost:1337/restaurant/update/${this.state.restaurantId}`, updatedRestaurant)
                .then((res)=>{
                    console.log('after successfully update', res.data);
                    alert('restaurant updated successfylly!');
                })
                .catch((err)=>{
                    console.log('error while updating restaurant', err);
                })

            this.setState({
                menuImg: '',
                restaurantName: '',
                address: '',
                phone: '',
                openingTime: '',
                closingTime: '',
                imageUrl: '',
                imageAlt: ''
            })
            this.props.history.push('/restaurant/manage');

        }
    }

    //handles change in the current targets and set the changes to the states
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    onFileChange = (e) => {
        this.setState({
            menuImg: e.target.files[0]
        })
    }
    
    render() {
        return (
            <div className="add-restaurant">
                <div className="row">
                    <form className='form' onSubmit={this.handleSubmit}>
                        <div className="form-group required">
                            <label className='control-label'>Restaurant Name </label>
                            <input type="text" className='form-control' name='restaurantName' value={this.state.restaurantName} onChange={this.changeHandler} />
                            <pre style={{color:'red'}}>{this.state.restaurantNameError}</pre>
                        </div>
                        <div className="form-group required">
                            <label className='control-label'>Restaurant Tagline </label>
                            <input type="text" className='form-control' name='tagline' value={this.state.tagline} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group required">
                            <label className='control-label'>Address </label>
                            <textarea className='form-control' name='address' value={this.state.address} onChange={this.changeHandler}></textarea>
                            <pre style={{color:'red'}}>{this.state.addressError}</pre>
                        </div>
                        <div className="form-group required">
                            <label className='control-label'>Phone </label>
                            <input type="text" className='form-control' name='phone' value={this.state.phone} onChange={this.changeHandler} />
                            <pre style={{color:'red'}}>{this.state.phoneError}</pre>
                        </div>
                        <div className="md-form md-outline form-group required">
                            <label className='control-label' htmlFor="default-picker">Opening Time </label>
                            <input type="time" id="default-picker" className="form-control" name='openingTime' value={this.state.openingTime} placeholder="Select time" onChange={this.changeHandler} />
                        </div>
                        <div className="md-form md-outline form-group required">
                            <label className='control-label' htmlFor="default-picker">Closing Time </label>
                            <input type="time" id="default-picker" className="form-control" name='closingTime' value={this.state.closingTime} placeholder="Select time" onChange={this.changeHandler}/>
                        </div>

                        <div className="form-group required">
                            <input className='form-control-file' type="file" onChange={this.onFileChange} />
                            {
                                this.state.restaurantId !=='' ? <img style={{width: '200px',height:'100px'}} src={this.state.imageUrl} alt={this.state.imageAlt}/>
                                :null
                            }
                            <div>
                                <button className="btn btn-primary" type='button' style={{display:'inline'}}onClick={this.uploadImageToCloud} disabled={this.state.loading}>Upload
                                </button>
                                {
                                    ( this.state.loading && this.state.imageUrl === '' )?
                                        <Spinner animation="border" role="status" style={{marginLeft: '10px'}} />
                                        :<Spinner role="status" />
                                }
                            </div>
                            <pre style={{color:'red'}}>{this.state.imageUrlError}</pre>
                            
                        </div>

                        <div className="form-group add-restaurant-btn">
                            <button className="btn btn-primary" type='submit'>Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default AddRestaurant
