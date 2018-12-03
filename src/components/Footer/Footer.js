import React from 'react';
import styles from './FooterStyles';

const Footer = () => (
    <footer class="page-footer" style={styles.footer}>
        <div className="row">
            <div className="col s12">
                <div className="center-align" style={styles.copy}>
                    ©Copyright 2018  [ Brak-its ]
                </div>
            </div>
        </div>
    </footer>
)

export default Footer;