using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDonorChurnIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "social_posts_campaign_created_idx",
                table: "social_media_posts",
                columns: new[] { "campaign_name", "created_at" });

            migrationBuilder.CreateIndex(
                name: "donations_campaign_name_idx",
                table: "donations",
                column: "campaign_name");

            migrationBuilder.CreateIndex(
                name: "donations_supporter_type_date_idx",
                table: "donations",
                columns: new[] { "supporter_id", "donation_type", "donation_date" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "social_posts_campaign_created_idx",
                table: "social_media_posts");

            migrationBuilder.DropIndex(
                name: "donations_campaign_name_idx",
                table: "donations");

            migrationBuilder.DropIndex(
                name: "donations_supporter_type_date_idx",
                table: "donations");
        }
    }
}
