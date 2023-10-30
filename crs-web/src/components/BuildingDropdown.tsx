import DBItemDropdown from 'DBItemDropdown';

function BuildingDropdown() {

    const fetch = () => {
        return api.get("/").then((result) => {
            const options = [];
            result.data.forEach();
            return res;
        });
    }

    return DBItemDropdown(fetch());
}

