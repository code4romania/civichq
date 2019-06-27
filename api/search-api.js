function SearchApi() {
    this.baseQuery = 'SELECT a.Id as AppId, ' +
        'c.Id as CategoryId, ' +
        'c.CatName as CategoryName, ' +
        'a.AppName, ' +
        'a.Tags, ' +
        'a.Logo as AppLogoName, ' +
        'n.Logo as NgoLogoName, ' +
        'a.Technologies, ' +
        'case when a.IsActive = 1 then \'true\' else \'false\' end as IsActive ' +
        'FROM Apps a '
    + ' INNER JOIN Categories c on a.CategoryId = c.Id '
    + ' INNER JOIN Ngos n on a.NgoId = n.Id ';
    this.baseWhere = ' WHERE a.IsApproved = 1 AND c.IsActive = 1 ';
    this.baseOrderBy = ' ORDER BY c.Ordinal, a.AppName';
}

SearchApi.prototype = {

    GetAllApprovedApps: function (req, res, seq) {
        var query = this.baseQuery + this.baseWhere + this.baseOrderBy + ';';
        
        seq.query(query,
            { type: seq.QueryTypes.SELECT })
            .then(function (apps) {
                res.json(apps);
            });
    },

    SearchBy: function (req, res, seq, searchString) {
        var src = '%' + searchString + '%';
        var newWhere = this.baseWhere + ' AND a.AppName LIKE :src ';
        var query = this.baseQuery + newWhere + this.baseOrderBy + ';';
        
        seq.query(query,
            {
                replacements: { src: src },
                type: seq.QueryTypes.SELECT
            })
            .then(function (apps) {

                res.json(apps);

            });

    }


}
module.exports = SearchApi;
