import React, { Component} from 'react';

import './styles.css'

class Modal extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isCopied: false
    };
  }

  handleCopyClick = () => {
    const codeElement = document.getElementById('code');
    const codeText = codeElement.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeText)
        .then(() => {
          this.setState({ isCopied: true });
        })
        .catch((error) => {
          console.error('Erro ao copiar o código:', error);
        });
    } else {
      console.error('A API Clipboard não é suportada neste navegador.');
    }
  };



  render() {
    const { isCopied } = this.state;
    const {idCode} = this.props;
    const { onClose } = this.props;

    

    return (
      <div className="modal">
        <div className="modal-over">
          <div className="modal-content">
          <h2>Seu ID de Acesso:</h2>
          <pre id="code" onClick={this.handleCopyClick}>
            {idCode}
          </pre>
          {isCopied && <p>Código copiado!</p>}
          <button className='button' onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Modal;
