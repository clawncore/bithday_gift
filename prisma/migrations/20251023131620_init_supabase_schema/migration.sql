-- CreateTable
CREATE TABLE "replies" (
    "id" TEXT NOT NULL,
    "choice" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipient_name" TEXT NOT NULL DEFAULT 'Chandrika',

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opened_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "content" JSONB,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secret_words" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "secret_words_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_replies_created_at" ON "replies"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "secret_words_word_key" ON "secret_words"("word");
