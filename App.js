import Conversor from './Conversor'

const App = () => (
    <>
        <div className={"header"}>
            <header>
                <h2>unit converter</h2>
                <hr/><br/>
            </header>
        </div>
        <Conversor/>
        <div className={"footer"}>
            <footer>
                <h1>footer</h1>
            </footer>
        </div>
        <style>
            {
                `

                    .footer {
                        position: fixed;

                        background: rgba(46, 0, 57, 1);

                        width: 100%;
                        height: 50px;

                        bottom: 0;
                        left: 0;
                    }
                `
            }
        </style>
    </>
)

export default App