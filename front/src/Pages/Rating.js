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


    <div >
      <h3 className="statsheader">Stats players</h3>
      <div >
        <table class="table table-bordered table-dark ">
          <tbody><tr>
            <th>Num</th>
            <th >Nickname</th>

            <th>Solved sudokus</th>

          </tr>

            {stats.length > 0 && stats.map((stat, index) => <Stat key={stat._id} {...stat} index={index} />
            )}

          </tbody>
        </table>
      </div>
    </div>

  );
}
