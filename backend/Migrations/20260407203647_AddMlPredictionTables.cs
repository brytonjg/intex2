using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMlPredictionTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ml_prediction_history",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    entity_type = table.Column<string>(type: "text", nullable: false),
                    entity_id = table.Column<int>(type: "integer", nullable: true),
                    model_name = table.Column<string>(type: "text", nullable: false),
                    model_version = table.Column<string>(type: "text", nullable: true),
                    score = table.Column<decimal>(type: "numeric(6,2)", nullable: true),
                    score_label = table.Column<string>(type: "text", nullable: true),
                    predicted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    metadata = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("ml_prediction_history_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ml_predictions",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    entity_type = table.Column<string>(type: "text", nullable: false),
                    entity_id = table.Column<int>(type: "integer", nullable: true),
                    model_name = table.Column<string>(type: "text", nullable: false),
                    model_version = table.Column<string>(type: "text", nullable: true),
                    score = table.Column<decimal>(type: "numeric(6,2)", nullable: true),
                    score_label = table.Column<string>(type: "text", nullable: true),
                    predicted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    metadata = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("ml_predictions_pkey", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "idx_ml_history_entity_model",
                table: "ml_prediction_history",
                columns: new[] { "entity_type", "entity_id", "model_name", "predicted_at" },
                descending: new[] { false, false, false, true });

            migrationBuilder.CreateIndex(
                name: "idx_ml_history_model",
                table: "ml_prediction_history",
                columns: new[] { "model_name", "predicted_at" },
                descending: new[] { false, true });

            migrationBuilder.CreateIndex(
                name: "idx_ml_predictions_entity",
                table: "ml_predictions",
                columns: new[] { "entity_type", "entity_id" });

            migrationBuilder.CreateIndex(
                name: "idx_ml_predictions_label",
                table: "ml_predictions",
                columns: new[] { "model_name", "score_label" });

            migrationBuilder.CreateIndex(
                name: "idx_ml_predictions_model_score",
                table: "ml_predictions",
                columns: new[] { "model_name", "score" },
                descending: new[] { false, true });

            migrationBuilder.CreateIndex(
                name: "ml_predictions_entity_type_entity_id_model_name_key",
                table: "ml_predictions",
                columns: new[] { "entity_type", "entity_id", "model_name" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ml_prediction_history");

            migrationBuilder.DropTable(
                name: "ml_predictions");
        }
    }
}
