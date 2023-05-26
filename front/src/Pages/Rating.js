import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Stat from "../Stat";
export default function Rating() {
  const { userInfo } = useContext(UserContext);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/showStats', {
      credentials: 'include',
    }).then(response => {
      response.json().then(stats => {
        setStats(stats);

      });
    });
  }, []);

  return (


    <div className="statscontent">
      <h3 className="statsheader">Stats players</h3>
      <table>
        <tr>
          <th>Num</th>
          <th>Nickname</th>
          
          <th>Solved sudokus</th>
          
        </tr>
        <tbody>
          {stats.length > 0 && stats.map((stat) => <Stat key={stat._id} {...stat} />
          )}

        </tbody>
      </table>
    </div>

  );
}
