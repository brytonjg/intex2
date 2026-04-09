using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CloseCompletedReintegrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Residents who completed reintegration should no longer be Active.
            // Set case_status = 'Closed' and date_closed = current date.
            migrationBuilder.Sql(@"
                UPDATE residents
                SET case_status = 'Closed',
                    date_closed = CURRENT_DATE
                WHERE case_status = 'Active'
                  AND reintegration_status = 'Completed';
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert: reopen residents that were closed by this migration
            migrationBuilder.Sql(@"
                UPDATE residents
                SET case_status = 'Active',
                    date_closed = NULL
                WHERE case_status = 'Closed'
                  AND reintegration_status = 'Completed'
                  AND date_closed = CURRENT_DATE;
            ");
        }
    }
}
