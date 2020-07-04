import React, { Fragment } from 'react';
import Card from '../components/Card/Card';

//const API = 'http://www.omdbapi.com/?i=tt3896198&apikey=ef61cb8f';
console.log(process.env.API);
const API = process.env.API;

class List extends React.Component{

    constructor(){
        super();
        this.state = {
            data:[],
            searchTerm: '',
            error: '',
            loading: true
        }
    }

    //Para solicitar los datos utilizo el metodo ComponentDidMount
    async componentDidMount(){
        //const res = await fetch('../../assets/data.json');
        const res = await fetch(`${API}&s=joker`);
        const resJSON = await res.json();
      //  console.log(resJSON);
       // console.log(resJSON);
        this.setState({data: resJSON.Search, loading:false})
    }

    async handleSubmit(e){
        e.preventDefault();
      //  console.log('enviando...');
        if(!this.state.searchTerm){
            return this.setState({error:'Por favor escriba un texto valido!!'});
        }

        const res = await fetch(`${API}&s=${this.state.searchTerm}`);
        const data = await res.json();
       // console.log(data);

        if(!data.Search){
            return this.setState({error: 'No hay resultados'});
        }

        this.setState({data: data.Search, error: '', searchTerm: ''});
    }

    render(){
        // return this.state.data.map(movie =>{
        //     return <Card movie={movie}/>
        // })

        const { data, loading } = this.state;
        if(loading){
            return <h3 className="text-light">Cargando...</h3>
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar" 
                                onChange={e => this.setState({searchTerm: e.target.value})}
                                value={this.state.searchTerm}
                                autoFocus
                            />
                        </form>
                        <p className="text-white">{this.state.error ? this.state.error: ''}</p>
                    </div>
                </div>
                <div className="row">
                    {
                        data.map((movie, i) =>{
                            return <Card movie={movie} key={i}/>
                        })
                    }
                </div>
            </Fragment>
        )

    }
}

export default List;