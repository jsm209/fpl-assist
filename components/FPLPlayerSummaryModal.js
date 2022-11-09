import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import utilStyles from '../styles/utils.module.css';
import { getPositionNameFromElementType, getTeamNameFromTeamCode } from '../lib/FPLDataProcessor';

// Popup single CTA modal for showing summary details about an individual player.
// Expects the following props:
// player - the player information to display
// open - bool dictating whether or not the modal is open
// callback - the callback action for the button
export default function FPLPlayerSummaryModal(props) {
    return (
        <Popup open={props.open} closeOnDocumentClick onClose={props.callback} className={utilStyles.popup}>
            <div className={utilStyles.modal}>
                <button className={utilStyles.modalCloseButton} onClick={props.callback}>X</button>
                <h2 className={utilStyles.modalHeader}>{props.player.first_name} {props.player.second_name}</h2>
                <p className={utilStyles.modalSubHeader}>{getPositionNameFromElementType(props.player.element_type)} for {props.player.team_name}</p>
                <div className={utilStyles.modalContent}>
                    <div className={utilStyles.centeredFlexboxPlayerSummary}>
                        <table className={utilStyles.playerTable}>
                            <h2>Ownership</h2>
                            <tr>
                                <td><span>Transfers In (Current Gameweek)</span></td>
                                <td>{props.player.transfers_in_event}</td>
                            </tr>
                            <tr>
                                <td><span>Transfers In (Total)</span></td>
                                <td>{props.player.transfers_in}</td>
                            </tr>
                            <tr>
                                <td><span>Transfers Out (Current Gameweek)</span></td>
                                <td>{props.player.transfers_out_event}</td>
                            </tr>
                            <tr>
                                <td><span>Transfers Out (Total)</span></td>
                                <td>{props.player.transfers_out}</td>
                            </tr>
                            <tr>
                                <td><span>Selected By (Percentage)</span></td>
                                <td>{props.player.selected_by_percent + "%"}</td>
                            </tr>
                        </table>
                        <table className={utilStyles.playerTable}>
                            <h2>Game Stats</h2>
                            <tr>
                                <td><span>Goals Scored</span></td>
                                <td>{props.player.goals_scored}</td>
                            </tr>
                            <tr>
                                <td><span>Assists</span></td>
                                <td>{props.player.assists}</td>
                            </tr>
                            <tr>
                                <td><span>Clean Sheets</span></td>
                                <td>{props.player.clean_sheets}</td>
                            </tr>
                            <tr>
                                <td><span>Saves</span></td>
                                <td>{props.player.saves}</td>
                            </tr>
                            <tr>
                                <td><span>Goals Condeded</span></td>
                                <td>{props.player.goals_conceded}</td>
                            </tr>
                            <tr>
                                <td><span>Yellow Cards</span></td>
                                <td>{props.player.yellow_cards}</td>
                            </tr>
                            <tr>
                                <td><span>Red Cards</span></td>
                                <td>{props.player.red_cards}</td>
                            </tr>
                        </table>
                    </div>
                    <div className={utilStyles.centeredFlexboxPlayerSummary}>
                        <table className={utilStyles.playerTable}>
                            <h2>Performance</h2>
                            <tr>
                                <td><span>Form</span></td>
                                <td>{props.player.form}</td>
                            </tr>
                            <tr>
                                <td><span>Points Per Game</span></td>
                                <td>{props.player.points_per_game}</td>
                            </tr>
                            <tr>
                                <td><span>Total Points</span></td>
                                <td>{props.player.total_points}</td>
                            </tr>
                        </table>
                        <table className={utilStyles.playerTable}>
                            <h2>Pricing</h2>
                            <tr>
                                <td><span>Price</span></td>
                                <td>{props.player.now_cost / 10}</td>
                            </tr>
                            <tr>
                                <td><span>Price change (Current Gameweek)</span></td>
                                <td>{props.player.cost_change_event / 10}</td>
                            </tr>
                            <tr>
                                <td><span>Price change (Overall)</span></td>
                                <td>{props.player.cost_change_start / 10}</td>
                            </tr>
                        </table>
                    </div>
                    <div className={utilStyles.centeredFlexboxPlayerSummary}>
                        <table className={utilStyles.playerTable}>
                            <h2>Ranks</h2>
                            <tr>
                                <td><span>Form Rank</span></td>
                                <td>{props.player.form_rank}</td>
                            </tr>
                            <tr>
                                <td><span>Points Per Game Rank</span></td>
                                <td>{props.player.points_per_game_rank}</td>
                            </tr>
                            <tr>
                                <td><span>Overall Selected Rank</span></td>
                                <td>{props.player.selected_rank}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </Popup>
    )
};