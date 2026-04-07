using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIdentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:auth.aal_level", "aal1,aal2,aal3")
                .Annotation("Npgsql:Enum:auth.code_challenge_method", "s256,plain")
                .Annotation("Npgsql:Enum:auth.factor_status", "unverified,verified")
                .Annotation("Npgsql:Enum:auth.factor_type", "totp,webauthn,phone")
                .Annotation("Npgsql:Enum:auth.oauth_authorization_status", "pending,approved,denied,expired")
                .Annotation("Npgsql:Enum:auth.oauth_client_type", "public,confidential")
                .Annotation("Npgsql:Enum:auth.oauth_registration_type", "dynamic,manual")
                .Annotation("Npgsql:Enum:auth.oauth_response_type", "code")
                .Annotation("Npgsql:Enum:auth.one_time_token_type", "confirmation_token,reauthentication_token,recovery_token,email_change_token_new,email_change_token_current,phone_change_token")
                .Annotation("Npgsql:Enum:net.request_status", "PENDING,SUCCESS,ERROR")
                .Annotation("Npgsql:Enum:realtime.action", "INSERT,UPDATE,DELETE,TRUNCATE,ERROR")
                .Annotation("Npgsql:Enum:realtime.equality_op", "eq,neq,lt,lte,gt,gte,in")
                .Annotation("Npgsql:Enum:storage.buckettype", "STANDARD,ANALYTICS,VECTOR")
                .Annotation("Npgsql:PostgresExtension:extensions.pg_net", ",,")
                .Annotation("Npgsql:PostgresExtension:extensions.pg_stat_statements", ",,")
                .Annotation("Npgsql:PostgresExtension:extensions.pgcrypto", ",,")
                .Annotation("Npgsql:PostgresExtension:extensions.uuid-ossp", ",,")
                .Annotation("Npgsql:PostgresExtension:graphql.pg_graphql", ",,")
                .Annotation("Npgsql:PostgresExtension:vault.supabase_vault", ",,");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    SupporterId = table.Column<int>(type: "integer", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "partners",
                columns: table => new
                {
                    partner_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    partner_name = table.Column<string>(type: "text", nullable: true),
                    partner_type = table.Column<string>(type: "text", nullable: true),
                    role_type = table.Column<string>(type: "text", nullable: true),
                    contact_name = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    phone = table.Column<string>(type: "text", nullable: true),
                    region = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("partners_pkey", x => x.partner_id);
                });

            migrationBuilder.CreateTable(
                name: "public_impact_snapshots",
                columns: table => new
                {
                    snapshot_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    snapshot_date = table.Column<DateOnly>(type: "date", nullable: true),
                    headline = table.Column<string>(type: "text", nullable: true),
                    summary_text = table.Column<string>(type: "text", nullable: true),
                    metric_payload_json = table.Column<string>(type: "text", nullable: true),
                    is_published = table.Column<bool>(type: "boolean", nullable: true),
                    published_at = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("public_impact_snapshots_pkey", x => x.snapshot_id);
                });

            migrationBuilder.CreateTable(
                name: "safehouses",
                columns: table => new
                {
                    safehouse_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    safehouse_code = table.Column<string>(type: "text", nullable: true),
                    name = table.Column<string>(type: "text", nullable: true),
                    region = table.Column<string>(type: "text", nullable: true),
                    city = table.Column<string>(type: "text", nullable: true),
                    province = table.Column<string>(type: "text", nullable: true),
                    country = table.Column<string>(type: "text", nullable: true),
                    open_date = table.Column<DateOnly>(type: "date", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    capacity_girls = table.Column<int>(type: "integer", nullable: true),
                    capacity_staff = table.Column<int>(type: "integer", nullable: true),
                    current_occupancy = table.Column<int>(type: "integer", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("safehouses_pkey", x => x.safehouse_id);
                });

            migrationBuilder.CreateTable(
                name: "social_media_posts",
                columns: table => new
                {
                    post_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    platform = table.Column<string>(type: "text", nullable: true),
                    platform_post_id = table.Column<string>(type: "text", nullable: true),
                    post_url = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    day_of_week = table.Column<string>(type: "text", nullable: true),
                    post_hour = table.Column<int>(type: "integer", nullable: true),
                    post_type = table.Column<string>(type: "text", nullable: true),
                    media_type = table.Column<string>(type: "text", nullable: true),
                    caption = table.Column<string>(type: "text", nullable: true),
                    hashtags = table.Column<string>(type: "text", nullable: true),
                    num_hashtags = table.Column<int>(type: "integer", nullable: true),
                    mentions_count = table.Column<int>(type: "integer", nullable: true),
                    has_call_to_action = table.Column<bool>(type: "boolean", nullable: true),
                    call_to_action_type = table.Column<string>(type: "text", nullable: true),
                    content_topic = table.Column<string>(type: "text", nullable: true),
                    sentiment_tone = table.Column<string>(type: "text", nullable: true),
                    caption_length = table.Column<int>(type: "integer", nullable: true),
                    features_resident_story = table.Column<bool>(type: "boolean", nullable: true),
                    campaign_name = table.Column<string>(type: "text", nullable: true),
                    is_boosted = table.Column<bool>(type: "boolean", nullable: true),
                    boost_budget_php = table.Column<decimal>(type: "numeric", nullable: true),
                    impressions = table.Column<int>(type: "integer", nullable: true),
                    reach = table.Column<int>(type: "integer", nullable: true),
                    likes = table.Column<int>(type: "integer", nullable: true),
                    comments = table.Column<int>(type: "integer", nullable: true),
                    shares = table.Column<int>(type: "integer", nullable: true),
                    saves = table.Column<int>(type: "integer", nullable: true),
                    click_throughs = table.Column<int>(type: "integer", nullable: true),
                    video_views = table.Column<int>(type: "integer", nullable: true),
                    engagement_rate = table.Column<decimal>(type: "numeric", nullable: true),
                    profile_visits = table.Column<int>(type: "integer", nullable: true),
                    donation_referrals = table.Column<int>(type: "integer", nullable: true),
                    estimated_donation_value_php = table.Column<decimal>(type: "numeric", nullable: true),
                    follower_count_at_post = table.Column<int>(type: "integer", nullable: true),
                    watch_time_seconds = table.Column<int>(type: "integer", nullable: true),
                    avg_view_duration_seconds = table.Column<int>(type: "integer", nullable: true),
                    subscriber_count_at_post = table.Column<int>(type: "integer", nullable: true),
                    forwards = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("social_media_posts_pkey", x => x.post_id);
                });

            migrationBuilder.CreateTable(
                name: "supporters",
                columns: table => new
                {
                    supporter_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    supporter_type = table.Column<string>(type: "text", nullable: true),
                    display_name = table.Column<string>(type: "text", nullable: true),
                    organization_name = table.Column<string>(type: "text", nullable: true),
                    first_name = table.Column<string>(type: "text", nullable: true),
                    last_name = table.Column<string>(type: "text", nullable: true),
                    relationship_type = table.Column<string>(type: "text", nullable: true),
                    region = table.Column<string>(type: "text", nullable: true),
                    country = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    phone = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    first_donation_date = table.Column<DateOnly>(type: "date", nullable: true),
                    acquisition_channel = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("supporters_pkey", x => x.supporter_id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "partner_assignments",
                columns: table => new
                {
                    assignment_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    partner_id = table.Column<int>(type: "integer", nullable: false),
                    safehouse_id = table.Column<int>(type: "integer", nullable: true),
                    program_area = table.Column<string>(type: "text", nullable: true),
                    assignment_start = table.Column<DateOnly>(type: "date", nullable: true),
                    assignment_end = table.Column<DateOnly>(type: "date", nullable: true),
                    responsibility_notes = table.Column<string>(type: "text", nullable: true),
                    is_primary = table.Column<bool>(type: "boolean", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("partner_assignments_pkey", x => x.assignment_id);
                    table.ForeignKey(
                        name: "partner_assignments_partner_id_fkey",
                        column: x => x.partner_id,
                        principalTable: "partners",
                        principalColumn: "partner_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "partner_assignments_safehouse_id_fkey",
                        column: x => x.safehouse_id,
                        principalTable: "safehouses",
                        principalColumn: "safehouse_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "residents",
                columns: table => new
                {
                    resident_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    case_control_no = table.Column<string>(type: "text", nullable: true),
                    internal_code = table.Column<string>(type: "text", nullable: true),
                    safehouse_id = table.Column<int>(type: "integer", nullable: true),
                    case_status = table.Column<string>(type: "text", nullable: true),
                    sex = table.Column<string>(type: "text", nullable: true),
                    date_of_birth = table.Column<DateOnly>(type: "date", nullable: true),
                    birth_status = table.Column<string>(type: "text", nullable: true),
                    place_of_birth = table.Column<string>(type: "text", nullable: true),
                    religion = table.Column<string>(type: "text", nullable: true),
                    case_category = table.Column<string>(type: "text", nullable: true),
                    sub_cat_orphaned = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_trafficked = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_child_labor = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_physical_abuse = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_sexual_abuse = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_osaec = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_cicl = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_at_risk = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_street_child = table.Column<bool>(type: "boolean", nullable: true),
                    sub_cat_child_with_hiv = table.Column<bool>(type: "boolean", nullable: true),
                    is_pwd = table.Column<bool>(type: "boolean", nullable: true),
                    pwd_type = table.Column<string>(type: "text", nullable: true),
                    has_special_needs = table.Column<bool>(type: "boolean", nullable: true),
                    special_needs_diagnosis = table.Column<string>(type: "text", nullable: true),
                    family_is_4ps = table.Column<bool>(type: "boolean", nullable: true),
                    family_solo_parent = table.Column<bool>(type: "boolean", nullable: true),
                    family_indigenous = table.Column<bool>(type: "boolean", nullable: true),
                    family_parent_pwd = table.Column<bool>(type: "boolean", nullable: true),
                    family_informal_settler = table.Column<bool>(type: "boolean", nullable: true),
                    date_of_admission = table.Column<DateOnly>(type: "date", nullable: true),
                    age_upon_admission = table.Column<string>(type: "text", nullable: true),
                    present_age = table.Column<string>(type: "text", nullable: true),
                    length_of_stay = table.Column<string>(type: "text", nullable: true),
                    referral_source = table.Column<string>(type: "text", nullable: true),
                    referring_agency_person = table.Column<string>(type: "text", nullable: true),
                    date_colb_registered = table.Column<DateOnly>(type: "date", nullable: true),
                    date_colb_obtained = table.Column<DateOnly>(type: "date", nullable: true),
                    assigned_social_worker = table.Column<string>(type: "text", nullable: true),
                    initial_case_assessment = table.Column<string>(type: "text", nullable: true),
                    date_case_study_prepared = table.Column<DateOnly>(type: "date", nullable: true),
                    reintegration_type = table.Column<string>(type: "text", nullable: true),
                    reintegration_status = table.Column<string>(type: "text", nullable: true),
                    initial_risk_level = table.Column<string>(type: "text", nullable: true),
                    current_risk_level = table.Column<string>(type: "text", nullable: true),
                    date_enrolled = table.Column<DateOnly>(type: "date", nullable: true),
                    date_closed = table.Column<DateOnly>(type: "date", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    notes_restricted = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("residents_pkey", x => x.resident_id);
                    table.ForeignKey(
                        name: "residents_safehouse_id_fkey",
                        column: x => x.safehouse_id,
                        principalTable: "safehouses",
                        principalColumn: "safehouse_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "safehouse_monthly_metrics",
                columns: table => new
                {
                    metric_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    safehouse_id = table.Column<int>(type: "integer", nullable: false),
                    month_start = table.Column<DateOnly>(type: "date", nullable: true),
                    month_end = table.Column<DateOnly>(type: "date", nullable: true),
                    active_residents = table.Column<int>(type: "integer", nullable: true),
                    avg_education_progress = table.Column<decimal>(type: "numeric", nullable: true),
                    avg_health_score = table.Column<decimal>(type: "numeric", nullable: true),
                    process_recording_count = table.Column<int>(type: "integer", nullable: true),
                    home_visitation_count = table.Column<int>(type: "integer", nullable: true),
                    incident_count = table.Column<int>(type: "integer", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("safehouse_monthly_metrics_pkey", x => x.metric_id);
                    table.ForeignKey(
                        name: "safehouse_monthly_metrics_safehouse_id_fkey",
                        column: x => x.safehouse_id,
                        principalTable: "safehouses",
                        principalColumn: "safehouse_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "donations",
                columns: table => new
                {
                    donation_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    supporter_id = table.Column<int>(type: "integer", nullable: true),
                    donation_type = table.Column<string>(type: "text", nullable: true),
                    donation_date = table.Column<DateOnly>(type: "date", nullable: true),
                    channel_source = table.Column<string>(type: "text", nullable: true),
                    currency_code = table.Column<string>(type: "text", nullable: true),
                    amount = table.Column<decimal>(type: "numeric", nullable: true),
                    estimated_value = table.Column<decimal>(type: "numeric", nullable: true),
                    impact_unit = table.Column<string>(type: "text", nullable: true),
                    is_recurring = table.Column<bool>(type: "boolean", nullable: true),
                    campaign_name = table.Column<string>(type: "text", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true),
                    referral_post_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("donations_pkey", x => x.donation_id);
                    table.ForeignKey(
                        name: "donations_referral_post_id_fkey",
                        column: x => x.referral_post_id,
                        principalTable: "social_media_posts",
                        principalColumn: "post_id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "donations_supporter_id_fkey",
                        column: x => x.supporter_id,
                        principalTable: "supporters",
                        principalColumn: "supporter_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "education_records",
                columns: table => new
                {
                    education_record_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: false),
                    record_date = table.Column<DateOnly>(type: "date", nullable: true),
                    education_level = table.Column<string>(type: "text", nullable: true),
                    attendance_rate = table.Column<decimal>(type: "numeric", nullable: true),
                    progress_percent = table.Column<decimal>(type: "numeric", nullable: true),
                    completion_status = table.Column<string>(type: "text", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true),
                    school_name = table.Column<string>(type: "text", nullable: true),
                    enrollment_status = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("education_records_pkey", x => x.education_record_id);
                    table.ForeignKey(
                        name: "education_records_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "residents",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "health_wellbeing_records",
                columns: table => new
                {
                    health_record_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: false),
                    record_date = table.Column<DateOnly>(type: "date", nullable: true),
                    weight_kg = table.Column<decimal>(type: "numeric", nullable: true),
                    height_cm = table.Column<decimal>(type: "numeric", nullable: true),
                    bmi = table.Column<decimal>(type: "numeric", nullable: true),
                    nutrition_score = table.Column<decimal>(type: "numeric", nullable: true),
                    sleep_quality_score = table.Column<decimal>(type: "numeric", nullable: true),
                    energy_level_score = table.Column<decimal>(type: "numeric", nullable: true),
                    general_health_score = table.Column<decimal>(type: "numeric", nullable: true),
                    medical_checkup_done = table.Column<bool>(type: "boolean", nullable: true),
                    dental_checkup_done = table.Column<bool>(type: "boolean", nullable: true),
                    psychological_checkup_done = table.Column<bool>(type: "boolean", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("health_wellbeing_records_pkey", x => x.health_record_id);
                    table.ForeignKey(
                        name: "health_wellbeing_records_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "residents",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "home_visitations",
                columns: table => new
                {
                    visitation_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: false),
                    visit_date = table.Column<DateOnly>(type: "date", nullable: true),
                    social_worker = table.Column<string>(type: "text", nullable: true),
                    visit_type = table.Column<string>(type: "text", nullable: true),
                    location_visited = table.Column<string>(type: "text", nullable: true),
                    family_members_present = table.Column<string>(type: "text", nullable: true),
                    purpose = table.Column<string>(type: "text", nullable: true),
                    observations = table.Column<string>(type: "text", nullable: true),
                    family_cooperation_level = table.Column<string>(type: "text", nullable: true),
                    safety_concerns_noted = table.Column<bool>(type: "boolean", nullable: true),
                    follow_up_needed = table.Column<bool>(type: "boolean", nullable: true),
                    follow_up_notes = table.Column<string>(type: "text", nullable: true),
                    visit_outcome = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("home_visitations_pkey", x => x.visitation_id);
                    table.ForeignKey(
                        name: "home_visitations_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "residents",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "incident_reports",
                columns: table => new
                {
                    incident_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: true),
                    safehouse_id = table.Column<int>(type: "integer", nullable: true),
                    incident_date = table.Column<DateOnly>(type: "date", nullable: true),
                    incident_type = table.Column<string>(type: "text", nullable: true),
                    severity = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    response_taken = table.Column<string>(type: "text", nullable: true),
                    resolved = table.Column<bool>(type: "boolean", nullable: true),
                    resolution_date = table.Column<DateOnly>(type: "date", nullable: true),
                    reported_by = table.Column<string>(type: "text", nullable: true),
                    follow_up_required = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("incident_reports_pkey", x => x.incident_id);
                    table.ForeignKey(
                        name: "incident_reports_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "residents",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "incident_reports_safehouse_id_fkey",
                        column: x => x.safehouse_id,
                        principalTable: "safehouses",
                        principalColumn: "safehouse_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "intervention_plans",
                columns: table => new
                {
                    plan_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: false),
                    plan_category = table.Column<string>(type: "text", nullable: true),
                    plan_description = table.Column<string>(type: "text", nullable: true),
                    services_provided = table.Column<string>(type: "text", nullable: true),
                    target_value = table.Column<decimal>(type: "numeric", nullable: true),
                    target_date = table.Column<DateOnly>(type: "date", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    case_conference_date = table.Column<DateOnly>(type: "date", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("intervention_plans_pkey", x => x.plan_id);
                    table.ForeignKey(
                        name: "intervention_plans_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "residents",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "process_recordings",
                columns: table => new
                {
                    recording_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    resident_id = table.Column<int>(type: "integer", nullable: false),
                    session_date = table.Column<DateOnly>(type: "date", nullable: true),
                    social_worker = table.Column<string>(type: "text", nullable: true),
                    session_type = table.Column<string>(type: "text", nullable: true),
                    session_duration_minutes = table.Column<int>(type: "integer", nullable: true),
                    emotional_state_observed = table.Column<string>(type: "text", nullable: true),
                    emotional_state_end = table.Column<string>(type: "text", nullable: true),
                    session_narrative = table.Column<string>(type: "text", nullable: true),
                    interventions_applied = table.Column<string>(type: "text", nullable: true),
                    follow_up_actions = table.Column<string>(type: "text", nullable: true),
                    progress_noted = table.Column<bool>(type: "boolean", nullable: true),
                    concerns_flagged = table.Column<bool>(type: "boolean", nullable: true),
                    referral_made = table.Column<bool>(type: "boolean", nullable: true),
                    notes_restricted = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("process_recordings_pkey", x => x.recording_id);
                    table.ForeignKey(
                        name: "process_recordings_resident_id_fkey",
                        column: x => x.resident_id,
                        principalTable: "residents",
                        principalColumn: "resident_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "donation_allocations",
                columns: table => new
                {
                    allocation_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    donation_id = table.Column<int>(type: "integer", nullable: false),
                    safehouse_id = table.Column<int>(type: "integer", nullable: true),
                    program_area = table.Column<string>(type: "text", nullable: true),
                    amount_allocated = table.Column<decimal>(type: "numeric", nullable: true),
                    allocation_date = table.Column<DateOnly>(type: "date", nullable: true),
                    allocation_notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("donation_allocations_pkey", x => x.allocation_id);
                    table.ForeignKey(
                        name: "donation_allocations_donation_id_fkey",
                        column: x => x.donation_id,
                        principalTable: "donations",
                        principalColumn: "donation_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "donation_allocations_safehouse_id_fkey",
                        column: x => x.safehouse_id,
                        principalTable: "safehouses",
                        principalColumn: "safehouse_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "in_kind_donation_items",
                columns: table => new
                {
                    item_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    donation_id = table.Column<int>(type: "integer", nullable: false),
                    item_name = table.Column<string>(type: "text", nullable: true),
                    item_category = table.Column<string>(type: "text", nullable: true),
                    quantity = table.Column<int>(type: "integer", nullable: true),
                    unit_of_measure = table.Column<string>(type: "text", nullable: true),
                    estimated_unit_value = table.Column<decimal>(type: "numeric", nullable: true),
                    intended_use = table.Column<string>(type: "text", nullable: true),
                    received_condition = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("in_kind_donation_items_pkey", x => x.item_id);
                    table.ForeignKey(
                        name: "in_kind_donation_items_donation_id_fkey",
                        column: x => x.donation_id,
                        principalTable: "donations",
                        principalColumn: "donation_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "donation_allocations_donation_id_idx",
                table: "donation_allocations",
                column: "donation_id");

            migrationBuilder.CreateIndex(
                name: "donation_allocations_safehouse_id_idx",
                table: "donation_allocations",
                column: "safehouse_id");

            migrationBuilder.CreateIndex(
                name: "donations_referral_post_id_idx",
                table: "donations",
                column: "referral_post_id");

            migrationBuilder.CreateIndex(
                name: "donations_supporter_id_idx",
                table: "donations",
                column: "supporter_id");

            migrationBuilder.CreateIndex(
                name: "education_records_resident_id_idx",
                table: "education_records",
                column: "resident_id");

            migrationBuilder.CreateIndex(
                name: "health_wellbeing_records_resident_id_idx",
                table: "health_wellbeing_records",
                column: "resident_id");

            migrationBuilder.CreateIndex(
                name: "home_visitations_resident_id_idx",
                table: "home_visitations",
                column: "resident_id");

            migrationBuilder.CreateIndex(
                name: "in_kind_donation_items_donation_id_idx",
                table: "in_kind_donation_items",
                column: "donation_id");

            migrationBuilder.CreateIndex(
                name: "incident_reports_resident_id_idx",
                table: "incident_reports",
                column: "resident_id");

            migrationBuilder.CreateIndex(
                name: "incident_reports_safehouse_id_idx",
                table: "incident_reports",
                column: "safehouse_id");

            migrationBuilder.CreateIndex(
                name: "intervention_plans_resident_id_idx",
                table: "intervention_plans",
                column: "resident_id");

            migrationBuilder.CreateIndex(
                name: "partner_assignments_partner_id_idx",
                table: "partner_assignments",
                column: "partner_id");

            migrationBuilder.CreateIndex(
                name: "partner_assignments_safehouse_id_idx",
                table: "partner_assignments",
                column: "safehouse_id");

            migrationBuilder.CreateIndex(
                name: "process_recordings_resident_id_idx",
                table: "process_recordings",
                column: "resident_id");

            migrationBuilder.CreateIndex(
                name: "residents_safehouse_id_idx",
                table: "residents",
                column: "safehouse_id");

            migrationBuilder.CreateIndex(
                name: "safehouse_monthly_metrics_safehouse_id_idx",
                table: "safehouse_monthly_metrics",
                column: "safehouse_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "donation_allocations");

            migrationBuilder.DropTable(
                name: "education_records");

            migrationBuilder.DropTable(
                name: "health_wellbeing_records");

            migrationBuilder.DropTable(
                name: "home_visitations");

            migrationBuilder.DropTable(
                name: "in_kind_donation_items");

            migrationBuilder.DropTable(
                name: "incident_reports");

            migrationBuilder.DropTable(
                name: "intervention_plans");

            migrationBuilder.DropTable(
                name: "partner_assignments");

            migrationBuilder.DropTable(
                name: "process_recordings");

            migrationBuilder.DropTable(
                name: "public_impact_snapshots");

            migrationBuilder.DropTable(
                name: "safehouse_monthly_metrics");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "donations");

            migrationBuilder.DropTable(
                name: "partners");

            migrationBuilder.DropTable(
                name: "residents");

            migrationBuilder.DropTable(
                name: "social_media_posts");

            migrationBuilder.DropTable(
                name: "supporters");

            migrationBuilder.DropTable(
                name: "safehouses");
        }
    }
}
