import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import FormatedDateTime from "@/components/FormatedDateTime";
import { getFile, getTotalSpaceUsed } from "@/lib/actions/file.action";

const Dashboard = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFile({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormatedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* Recent files uploaded */}
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100 mb-6">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <div className="space-y-4">
            {files.documents.map((file: Models.Document) => (
              <div
                key={file.$id}
                className="recent-file-card group hover:bg-light-200/5 transition-colors duration-200 rounded-lg p-4 border border-light-400/10"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="w-12 h-12 sm:w-14 sm:h-14"
                    />
                  </div>

                  {/* File Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={file.url}
                          target="_blank"
                          className="block group-hover:text-brand transition-colors"
                        >
                          <p className="recent-file-name truncate text-sm  font-medium text-light-100">
                            {file.name}
                          </p>
                        </Link>
                        <div className="flex items-center gap-3 mt-1">
                          <FormatedDateTime
                            date={file.$createdAt}
                            className="caption text-light-200 text-xs sm:text-sm"
                          />
                          {file.size && (
                            <>
                              <span className="text-xs sm:text-sm text-light-200">
                                {convertFileSize(file.size)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Dropdown */}
                      <div className="flex-shrink-0 self-start sm:self-center">
                        <ActionDropdown file={file} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state py-12 text-center">
            <div className="mx-auto w-16 h-16 bg-light-200/10 rounded-full flex items-center justify-center mb-4">
              <Image
                src="public/assets/icons/upload.svg"
                alt="No files"
                width={24}
                height={24}
                className="opacity-50"
              />
            </div>
            <p className="empty-list text-light-200 text-base">No files uploaded yet</p>
            <p className="text-sm text-light-500 mt-1">Upload your first file to get started</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;