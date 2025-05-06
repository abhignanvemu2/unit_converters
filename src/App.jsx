import React from 'react';
import convert from 'convert-units';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Selector from './Components/Selectors';
import InputField from './Components/InputField';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            mainSelector: '',
            firstQuantity: '',
            secondQuantity: '',
            firstInput: 0,
            secondInput: 0,
            flow: ''
        }
    }

    generateMainSelector = () => {
        return (
            convert().measures()
                .map(ele => ele[0].toUpperCase() + ele.slice(1))
        )
    }

    handleMainSelector = event => {
        event.preventDefault();
        this.setState({
            mainSelector: event.target.value,
            firstQuantity: '',
            secondQuantity: '',
            firstInput: 0,
            secondInput: 0
        })
    }

    handleSelector = event => {
        this.setState({[event.target.name]: event.target.value, firstInput: 0, secondInput: 0})
    }

    handleInputFields = event => {
        event.preventDefault();
        if(event.target.name === 'firstInput') {
            this.setState({
                firstInput: event.target.value,
                flow: 'L2R'
            },
            () => this.handleConversion())
        }
        else if(event.target.name === 'secondInput') {
            this.setState({
                secondInput: event.target.value,
                flow: 'R2L'
            },
            () => this.handleConversion())
        }
    }

    handleConversion = () => {
        if(this.state.flow === 'L2R') {
            this.setState({
                secondInput: convert(this.state.firstInput).from(this.state.firstQuantity).to(this.state.secondQuantity)
            })
        }
        else if(this.state.flow === 'R2L') {
            this.setState({
                firstInput: convert(this.state.secondInput).from(this.state.secondQuantity).to(this.state.firstQuantity)
            })
        }
    }

    render() {
        return (
            <Container maxWidth="1400px" style={{marginTop: '2rem'}} className=''>
                <Grid container justify="center" align="center" spacing={3}>
                    <Grid item xs={12}>
                        <Selector 
                            data={{
                                size: 12, 
                                label: 'Measurement', 
                                measurements: convert().measures(), 
                                populateType: 'mainSelector', 
                                populateWith: this.generateMainSelector(), 
                                selectedValue: this.state.mainSelector 
                            }} 
                            handleSelector={this.handleMainSelector} 
                        />
                    </Grid>

                    {
                        this.state.mainSelector ? (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Selector 
                                        data={{
                                            size: 6, 
                                            label: 'Quantity', 
                                            populateType: 'firstQuantity', 
                                            populateWith: convert().list(this.state.mainSelector), 
                                            selectedValue: this.state.firstQuantity 
                                        }} 
                                        handleSelector={this.handleSelector} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Selector 
                                        data={{
                                            size: 6, 
                                            label: 'Quantity', 
                                            populateType: 'secondQuantity', 
                                            populateWith: convert().list(this.state.mainSelector), 
                                            selectedValue: this.state.secondQuantity 
                                        }} 
                                        handleSelector={this.handleSelector} 
                                    />
                                </Grid>
                            </>
                        ) : null
                    }

                    {
                        this.state.firstQuantity && this.state.secondQuantity ? (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <InputField 
                                        data={{
                                            currentValue: this.state.firstInput, 
                                            input: this.state.firstQuantity, 
                                            label: this.state.firstQuantity, 
                                            name: 'firstInput' 
                                        }} 
                                        handleInput={this.handleInputFields} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputField 
                                        data={{
                                            currentValue: this.state.secondInput, 
                                            input: this.state.secondQuantity, 
                                            label: this.state.secondQuantity, 
                                            name: 'secondInput' 
                                        }} 
                                        handleInput={this.handleInputFields} 
                                    />
                                </Grid>
                            </>
                        ) : null
                    }
                </Grid>
            </Container>
        )
    }
}

export default App;
