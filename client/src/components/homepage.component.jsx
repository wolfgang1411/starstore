import React , { useEffect} from 'react'
import {connect} from 'react-redux';
import { getDirectory } from '../redux/actions/directory.action';
import Spinner from './spinner.component'

const Homepage = ({getDirectory, directory:{loading}}) => {
    useEffect(() => {
        getDirectory()
    },[getDirectory])
    return (
        <div>
            {
                loading ? <Spinner/>: 'fjshkfjhk'
            }
            
        </div>
    )
}

const mapStateToProps = state => ({
    directory:state.directory
})

export default connect(mapStateToProps,{getDirectory})(Homepage)
