import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className="success font-small pt-4 mt-4">
            <div className="Footer">
                <div className="container fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="FooterTitle">Five Streak</h5>
                            <p className="FooterDescription">
                                Do the Five. Keep a Streak. Save Lives.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="FooterTitle">Links</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a
                                        className="FooterLink"
                                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                                    >
                                        WHO advice
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="FooterLink"
                                        href="https://sacoronavirus.co.za/"
                                    >
                                        South African resource portal
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="FooterLink"
                                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
                                    >
                                        About masks
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Copyright footer-copyright text-center py-3">
                <div className="container fluid">© 2020 Copyright: Andi Qu</div>
            </div>
        </footer>
    );
}
